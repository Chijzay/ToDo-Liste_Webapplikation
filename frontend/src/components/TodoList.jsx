import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggle, onUpdate }) {
  if (todos.length === 0)
    return (
      <p className="text-center text-gray-500">Keine ToDos für diesen Filter.</p>
    );

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={() => onDelete(todo._id)}
          onToggle={() => onToggle(todo._id)}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TodoList;
