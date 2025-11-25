import { useState } from 'react';

const PRESET_CATEGORIES = ['Arbeit', 'Haushalt', 'Freizeit', 'Einkaufen'];

const getTodayString = () => new Date().toISOString().slice(0, 10);

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(getTodayString());
  const [category, setCategory] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const finalDueDate = dueDate || getTodayString();

    onAdd({
      text: text.trim(),
      dueDate: finalDueDate,
      category: category || selectedPreset || '',
    });

    setText('');
    setDueDate(getTodayString());
    setCategory('');
    setSelectedPreset('');
  };

  const today = getTodayString();

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-2">
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring"
          placeholder="Neues ToDo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Deadline:</label>
          <input
            type="date"
            className="border rounded-lg px-2 py-1 text-sm"
            value={dueDate}
            min={today}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Kategorie:</label>
          <select
            className="border rounded-lg px-2 py-1 text-sm"
            value={selectedPreset}
            onChange={(e) => {
              setSelectedPreset(e.target.value);
              if (e.target.value) setCategory('');
            }}
          >
            <option value="">Vorauswahl</option>
            {PRESET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            className="border rounded-lg px-2 py-1 text-sm"
            placeholder="oder eigene Kategorie"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value) setSelectedPreset('');
            }}
          />
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
