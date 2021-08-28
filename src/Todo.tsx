import React, { useEffect, useState } from 'react'
import TodoClass from './models/Todo';
import TodoStatus from './models/TodoStatus';
import StatusInput from './StatusInput';

interface TodoProps {
    index: number,
    value: TodoClass,
    updateTodo: (index: number, update: TodoClass) => void,
    removeTodo: (index: number) => void;
}
export default function Todo({ index, value, updateTodo, removeTodo }: TodoProps) {
    const { title } = value;
    const [status, setStatus] = useState(value.status);
    const [deadline, setDeadline] = useState(new Date(value.deadline?.toString() || Date.now()));

    useEffect(() => {
        const todo = new TodoClass(title, status, deadline);
        console.log('Todo updated', todo);
        updateTodo(index, todo);
    }, [title, status, deadline, index, updateTodo])

    return (
        <div key={`${title}-${index}`} style={{
            padding: 4,
            borderBottom: "1px solid #ccc",
            display: "flex",
          }}
        >
          <span style={{ flex: 1 }}>{title}</span>
          <StatusInput onChange={e => setStatus(e.target.value as TodoStatus)} value={status} />
          {deadline ? 
            <input type="date" name="deadline" id="todoDeadline" 
                value={deadline.toISOString().slice(0, 10)}
                onChange={e => setDeadline(new Date(e.target.value))}    
            /> : 
            <p>No deadline</p>
          }  
          <span style={{ cursor: "pointer" }} onClick={() => removeTodo(index)}>&times;</span>
        </div>
    )
}
