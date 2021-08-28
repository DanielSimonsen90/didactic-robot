import React, { FormEvent, useState } from 'react'
import Todo from './models/Todo';
import TodoStatus from './models/TodoStatus';
import StatusInput from './StatusInput';

export default function TodoForm({ onSubmit: submitToTodos }: { onSubmit: (e: FormEvent<HTMLFormElement>, todoItem: Todo) => any }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<TodoStatus>('Todo');
    const [deadlineValue, setDeadlineValue] = useState("");

    function onSubmit(e: FormEvent<HTMLFormElement>) {
      const todo = new Todo(title, status, deadlineValue ? new Date(deadlineValue) : undefined);
      console.log(todo);
      
      //Emit to Todos.tsx
      submitToTodos(e, todo);
      
      //Clear form
      setTitle("");
      if (status !== 'Todo') setStatus('Todo');
      if (deadlineValue) setDeadlineValue("");
    }

    const titleStyle = {
        display: "inline-flex",
        flex: 1,
        padding: 4,
        border: "1px solid #eaeaea",
        marginRight: 4,
    }

    return (
      <form onSubmit={onSubmit} style={{ display: "flex", marginBottom: 8 }}>
        <input type="text" name="newTodo" id="newTodo" placeholder="Title"
          value={title} onChange={(e) => setTitle(e.target.value)}
          style={titleStyle}
        />
        <StatusInput onChange={e => setStatus(e.target.value as TodoStatus)} value={status} />
        <input type="date" name="deadline" id="todoDeadline" 
          value={deadlineValue} 
          onChange={e => setDeadlineValue(e.target.value)}
        />
        <button type="submit" style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}>Add</button>
      </form>
    )
}
