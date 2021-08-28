import TodoStatus from "./TodoStatus";

export default class Todo {
    constructor(public title: string, public status: TodoStatus = 'Todo', public deadline?: Date) {}
}