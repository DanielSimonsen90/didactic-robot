# Daniel Simonsen Todo case by SMART-TRIAL

## Introduction
I'm a datatechnician student that specializes in programming, and I'm studing at TECHCOLLEGE, Aalbrog, and have done so for 3 years.
I've always had the interest in web-development, and after being introduced to Vue.js, made a few projects in Vue, I quickly moved onto React.js, as I find it to be the most dominant component-based framework.

Only recently have I started learning React, however this did not stop me from attempting this challenge.

## Installation
After forking the repository, I installed its necessary dependencies, and updated `@types/react`, so my VS Code wouldn't cry at me for not being able to find the package in node_modules...

## Analyzing the case
Before taking on the case, I took a quick glance over the tasks and brainstormed, how I could solve them.

### Task 1: Convert it from class-based to function-based component(s)
This seems pretty easy - as I didn't start my React journey with classes, I have however researched prior to the case, the differences between class-based and function-based components, how you would convert something from class to function and vise versa, and why one would make sense over the other.
This shouldn't take long.

### Task 2: Add statuses to the items in the list: "Todo", "Doing", "Done". It should be possible to move the items through these statuses and see clearly which status each item is in
This also shouldn't be too difficult. I know of Typescripts "Type" type, and I know for a fact, I want to go with that approach, to limit both the user through a datalist, but also the developer so there can be absolutely no mistakes in forms of misspelling or miscasing.
My initial idea for this task, would be, as mentioned, make a datalist for the items, and show a dropdown menu for each todo-item. Once a new value in the list has been selected, the component should update the todo with the new state.
However, with this change, and noticing that the todos in the case are a string array, I would also need to convert them into a Todo class, so I can save the new data into an object. Alternatively, I could save them in a Map with a todo-item as key, and status as value, however I would argue that saving the todos as classes would be cleaner.

### Task 3: Add an optional deadline to items. A date and time for when an item should be complete
This also doesn't look too difficult. Continuing with my idea of converting the string array todos into a Todo class array, it would simply adding a new property to the class. However, I noticed that the default todo items don't seem to be saved anywhere, and so I would like to implement saving the todo items to local storage, so the deadlines make sense.
To define the deadlines, it's as simple as adding a <input type="date"> and saving its value in my todo item.

### Conclusion
It would be wise of me to convert the todos from a string array to a new **Todo class** array, where the todo class would assumingly look like this:
```ts
class Todo {
   constructor(title: stirng, status: TodoStatus = 'Todo', deadline?: Date)

   title: string
   status: TodoStatus
   deadline: Date
}
```
This of course implements another idea, which would be to implement a **TodoStatus type**:
```ts
type TodoStatus = 'Todo' | 'Doing' | 'Done'
```

To keep the Todos.tsx file cleaner, I would implement a new **TodoForm.tsx** file, to handle the adding part of a new todo
The component's props should handle the initial form submit, but emit a new todo item up to the Todos.tsx component.

## Solving the case
### Task 1: Convert it from class-based to function-based component(s)
As expected, this didn't take long.
Simply converted from top to bottom, only modifying a tiny bit of the class component. However, converting the state declarations and function handlers, I found it more efficient to write a copy of the previous defined item, then deleting the original, as it was only for reference.

The task took **3 minutes, 37 seconds**

### Task 2: Add statuses to the items in the list: "Todo", "Doing", "Done". It should be possible to move the items through these statuses and see clearly which status each item is in
I began making my new class and type in a `src/models` folder. Using some smart property initialization in my class, made the process a lot faster, so I didn't need to work too much on defining my models.
I then quickly began cutting the whole <form> element from the Todos.tsx into a new file, TodoForm.tsx.
Moving everything over was easy, and all there really was left for me to do, was to implement a new input field that had a list of the status types I defined in `./models/StatusTypes.ts`, was making a datalist with options mapped by a TodoStatus[].
When submitting from my TodoForm.tsx, I used the Todo.tsx' `onSubmit` function which I passed as a prop - however I had added a new parameter, being a new instance of my Todo class, containing the title provided by #newTodo, and a status provided from my new datalist.

However, when viewing the saved todos, you should also be able to edit the current status from "Todo" to "Doing", and finally, "Done". As I did in my TodoForm.tsx, I added the same input/datalist logic, but quickly came to notice that I couldn't edit the status in the object, because the input value was different from the new object I created with the updated values.
After a bit of thinking, I decided to create a Todo.tsx, that took the index, todoItem, a new updateTodo function, and removeTodo as its props. Then I could separate the status property and put it in its own state, so I then easily could cause the re-render and the modification I was needing. I also implemented a useEffect, so each time the component is re-rendered, it updates the initial todos array from Todos.tsx using the updateTodo prop.

The task took **31 minutes, 20 seconds**

### Task 3: Add an optional deadline to items. A date and time for when an item should be complete
Implementing this feature with the way I have the project set up with 3 seperate files, made it really easy and fast.
However, dealing with dates is always a struggle, and since the <input type="date"> doesn't simply accept a Date object, I had a little trouble converting from string to date, whilst also fulfilling the yyyy-MM-dd requirement from the <input type="date">.

The task took **23 minutes, 50 seconds**

## Total time spent: 58 minutes, 47 seconds

### Bonus tasks: Add LocalStorage support & put datalist in own component
To add onto the case to make sense and be a bit cleaner, I decided to start off with moving the status types datalist into its own component, StatusInput.tsx, so I can use the component in Todo.tsx and TodoForm.tsx.
For the Todos case to make sense, it should save the todos, so they aren't lost on refresh. I used localStorage as a solution to this.

The tasks took **14 minutes, 57 seconds**