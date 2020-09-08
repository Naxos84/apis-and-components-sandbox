import { useReducer, useState, useEffect } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const initialTodos: Array<Todo> = [
  { id: 1, title: "React lernen", completed: false },
  { id: 2, title: "Einkaufen", completed: true }
];

type Action = {
  type: string;
  payload?: any;
};

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

type UseTodo = {
  todos: Todo[];
  loading: boolean;
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};
export const useTodos = (): UseTodo => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [loading, setLoading] = useState(false);

  function fetchTodos() {
    setLoading(true);
    fetch(apiUrl)
      .then(res => res.json())
      .then(todos => {
        setLoading(false);
        //setTodos(todos);
        dispatch({ type: "set", payload: todos });
      });
  }

  useEffect(fetchTodos, []);

  const addTodo = (title: string) => {
    dispatch({ type: "add", payload: title });
  };
  const removeTodo = (id: number) => {
    dispatch({ type: "delete", payload: id });
  };
  const toggleTodo = (id: number) => {
    dispatch({ type: "toggle", payload: id });
  };
  return { todos, loading, addTodo, removeTodo, toggleTodo };
};

function todosReducer(state: Array<Todo>, action: Action): Array<Todo> {
  switch (action.type) {
    case "toggle":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "delete":
      return state.filter(todo => todo.id !== action.payload);
    case "add":
      const newId = Math.max(...state.map(todo => todo.id), 0) + 1;
      return [...state, { id: newId, title: action.payload, completed: false }];
    case "set":
      return action.payload;
    default:
      throw new Error("unknown action");
  }
}
