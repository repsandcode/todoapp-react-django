import React from "react";
import { GoCheckCircle, GoCircle } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

const TodoBox = ({ todo, handleCheckbox, setEditTodo }) => {
  return (
    <div className="flex px-6 py-5 justify-between">
      <div className="flex gap-3">
        <div
          className="self-center text-xl cursor-pointer text-sky-500"
          title={todo.id}
          onClick={() => handleCheckbox(todo.id, todo.completed)}
        >
          {todo.completed ? <GoCheckCircle /> : <GoCircle />}
        </div>

        <div className={`text-base ${todo.completed ? "line-through" : ""}`}>
          {todo.body}
        </div>
      </div>

      <span className="self-center text-xl cursor-pointer">
        <label
          htmlFor="my_modal_6"
          className="cursor-pointer"
          onClick={() =>
            setEditTodo({
              id: todo.id,
              body: todo.body,
            })
          }
        >
          <FiEdit2 />
        </label>
      </span>
    </div>
  );
};

export default TodoBox;
