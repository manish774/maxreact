import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import { Todo } from "./model";
import "./singletodo.scss";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [editTodo, setEditTodo] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const handleDone = (id: number) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodo);
  };

  const handleEdit = (id: number) => {
    setEdit(!edit);
    setEditTodo(todo.todo);
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodo);
  };

  const editTodoFunc = (id: number) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodo } : todo
    );
    setTodos(updatedTodo);
    setEdit(false);
  };
  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          key={todo.id}
          className={`card`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={`inline-display ${!edit ? "none" : ""}`}
            style={{ position: "absolute" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTodoFunc(todo.id);
              }}
            >
              <InputField
                todo={editTodo}
                setTodo={setEditTodo}
                style={{ display: "inline", padding: "5px" }}
                inputStyle={{
                  padding: "5px",
                  display: "inline",
                  width: "100px",
                  margin: "2px",
                  position: "absolute",
                }}
              />
            </form>
          </div>
          <div className={`inline-display ${edit ? "none" : ""}`}>
            <span className="todo-name">{todo.todo}</span>
          </div>
          <div className="action-buttons">
            <span className={`yellow ${todo.isDone ? " disabled" : ""}`}>
              <AiFillEdit onClick={() => handleEdit(todo.id)} />
            </span>
            <span className={`red ${todo.isDone ? " disabled" : ""}`}>
              <AiFillDelete
                onClick={() => {
                  handleDelete(todo.id);
                }}
              />
            </span>
            <span
              className="green"
              onClick={() => {
                handleDone(todo.id);
              }}
            >
              <MdOutlineDone />
            </span>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default SingleTodo;
