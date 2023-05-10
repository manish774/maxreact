import React, { useState, useContext, useEffect } from "react";
import InputField from "./components/InputField";
import "./App.scss";
import Button from "./components/Button";
import { Todo } from "./components/model";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ThemeChanger from "./components/ThemeChanger";
import ThemeReducer from "./store/ThemeReducer";
import { ThemeContext } from "./store/ThemeContext";
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const ctx = useContext<any>(ThemeContext);

  const addTodos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return false;
    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    // Source Logic
    if (source.droppableId === "activeTask") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "activeTask") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-container" style={{ background: ctx.color }}>
          <Form addTodos={addTodos}>
            <h3 className="heading">Typescript</h3>
            <InputField
              todo={todo}
              setTodo={setTodo}
              style={{ display: "inline" }}
            />
            <Button value="Go" />
          </Form>
          {todos.length ? (
            <TodoList
              todoList={todos}
              setTodos={setTodos}
              CompletedTodos={CompletedTodos}
              setCompletedTodos={setCompletedTodos}
            />
          ) : (
            <p className="pink-color">No Data to display</p>
          )}
        </div>
      </DragDropContext>
      <div className="theme-container">
        <ThemeChanger />
      </div>
    </>
  );
};

export default App;
