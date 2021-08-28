import { useState, FormEvent } from "react";
import TodoForm from "./TodoForm";
import TodoClass from './models/Todo'
import Todo from './Todo'

export default function Todos() {
  const todosFromStorage = localStorage.getItem('todos');
  const [todos, setTodos] = useState<Array<TodoClass>>((todosFromStorage && JSON.parse(todosFromStorage)) || new Array<TodoClass>());

  function onSubmit(e: FormEvent<HTMLFormElement>, todoItem: TodoClass) {
    e.preventDefault();
    if (!todoItem) return;

    setTodos([...todos, todoItem]);
  };

  const updateTodo = (index: number, update: TodoClass) => setTodos(todos => {
    todos[index] = update;
    localStorage.setItem('todos', JSON.stringify(todos));    
    return todos;
  })
  const removeTodo = (removeIndex: number) => setTodos(todos.filter((_, i) => i !== removeIndex));

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        width: 500,
        margin: "0 auto",
        padding: 8,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Todo</h2>
      <TodoForm onSubmit={onSubmit} />
      {todos.length && (
        <div>
            <div style={{ textAlign: "center" }}>Add some todos</div>
            {todos.map((todo, i) => <Todo key={i} index={i} value={todo} updateTodo={updateTodo} removeTodo={removeTodo} />)}
        </div>
      )}
    </div>
  );
}
