import React from "react";
interface Todo {
  addTodos: (e: React.FormEvent) => void;
  children: React.ReactNode;
}
const Form = ({ addTodos, children }: Todo) => {
  return <form onSubmit={addTodos}>{children}</form>;
};

export default Form;
