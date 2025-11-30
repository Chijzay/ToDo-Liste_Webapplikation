const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    gratitude: {
      type: [String], // Dinge, die glücklich gemacht haben
      default: [],
    },
    bestTasks: {
      type: [String], // Top-4 Aufgaben des Tages
      default: [],
    },
    mood: {
      type: Number, // 1–5
      default: 3,
      min: 1,
      max: 5,
    },
    water: {
      type: Number, // Anzahl Gläser Wasser
      default: 0,
      min: 0,
      max: 8,
    },
    notes: {
      type: String, // Freitext
      default: '',
    },
  },
  { timestamps: true }
);

JournalEntrySchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
