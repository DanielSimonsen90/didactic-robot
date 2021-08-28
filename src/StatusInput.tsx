import React, { ChangeEvent } from 'react'
import TodoStatus from './models/TodoStatus'

interface StatusInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => any,
    value: TodoStatus
}

export default function StatusInput({ onChange, value }: StatusInputProps) {
    return (
        <>
            <input list="statusTypes" value={value} onChange={onChange}/>
            <datalist id="statusTypes">
                {(['Todo', 'Doing', 'Done'] as TodoStatus[]).map(statusType => (
                    <option value={statusType} key={statusType} />
                ))}
            </datalist>    
        </>
    )
}
