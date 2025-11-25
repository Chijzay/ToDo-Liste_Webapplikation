const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

// alle Routen brauchen Auth
router.use(auth);

const normalizeDate = (d) => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

// GET /api/todos – alle Todos für eingeloggten User
router.get('/', async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(todos);
});

// POST /api/todos – neues Todo
router.post('/', async (req, res) => {
  const { text, dueDate, category } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  let finalDueDate = dueDate ? new Date(dueDate) : new Date();
  const today = normalizeDate(new Date());
  finalDueDate = normalizeDate(finalDueDate);

  if (finalDueDate < today) {
    return res
      .status(400)
      .json({ message: 'Deadline darf nicht in der Vergangenheit liegen' });
  }

  const todo = await Todo.create({
    text,
    dueDate: finalDueDate,
    category: category || '',
    user: req.user._id,
  });

  res.status(201).json(todo);
});

// DELETE /api/todos/:id – Todo löschen (nur eigenes)
router.delete('/:id', async (req, res) => {
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!todo) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(204).end();
});

// PATCH /api/todos/:id – Todo aktualisieren
router.patch('/:id', async (req, res) => {
  const fieldsToUpdate = {};

  // einfache Felder
  ['text', 'done', 'category'].forEach((key) => {
    if (req.body[key] !== undefined) {
      fieldsToUpdate[key] = req.body[key];
    }
  });

  // Deadline behandeln (Pflicht, nicht in der Vergangenheit)
  if (req.body.dueDate !== undefined) {
    let finalDueDate = req.body.dueDate ? new Date(req.body.dueDate) : new Date();
    const today = normalizeDate(new Date());
    finalDueDate = normalizeDate(finalDueDate);

    if (finalDueDate < today) {
      return res
        .status(400)
        .json({ message: 'Deadline darf nicht in der Vergangenheit liegen' });
    }

    fieldsToUpdate.dueDate = finalDueDate;
  }

  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: fieldsToUpdate },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(updated);
});

module.exports = router;
