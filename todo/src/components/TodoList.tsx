import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import "./TodoList.scss";
interface List {
  todoList: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}
const TodoList: React.FC<List> = ({
  todoList,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {
        <Droppable droppableId="activeTask">
          {(provided, snapshot) => (
            <div
              className="half active-todo borderPink"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span>
                <h1>Active Todo</h1>
                {todoList?.map((todo, index) => (
                  <SingleTodo
                    index={index}
                    todos={todoList}
                    todo={todo}
                    key={todo.id}
                    setTodos={setTodos}
                  />
                ))}
                {provided.placeholder}
              </span>
            </div>
          )}
        </Droppable>
      }
      <Droppable droppableId="completedTask">
        {(provided) => (
          <div
            className="half completed-todo borderPink"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ border: "1px solid red" }}
          >
            <h1>Completed Todo</h1>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
