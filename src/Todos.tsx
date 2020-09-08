import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useTodos } from "./useTodos";

export const Todos = () => {
  const { todos, loading, addTodo, removeTodo, toggleTodo } = useTodos();

  const [newTitle, setNewTitle] = useState<string>("");

  const todoElements = todos.map((todo) => {
    let prefix;
    if (todo.completed) {
      prefix = "DONE: ";
    } else {
      prefix = "TODO: ";
    }
    return (
      <li
        key={todo.id}
        className={todo.completed ? "todoitem completed" : "todoitem"}
        onClick={() => toggleTodo(todo.id)}
      >
        {prefix + todo.title}
        <Button
          onClick={(event) => {
            event.stopPropagation();
            removeTodo(todo.id);
          }}
        >
          X
        </Button>
      </li>
    );
  });

  return (
    <React.Fragment>
      <h1>Todos</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setNewTitle("");
          addTodo(newTitle);
        }}
      >
        <TextField
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          label="new todo"
        />
        <Button color="primary" variant="contained" type="submit">
          add
        </Button>
      </form>
      {loading ? <div>loading...</div> : <ul>{todoElements}</ul>}
    </React.Fragment>
  );
};
