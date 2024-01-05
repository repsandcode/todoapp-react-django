import React from "react";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const TodoBox = ({ todo, handleCheckbox, handleDelete, setEditTodo }) => {
  return (
    <div className="flex p-3 justify-between">
      <div className="flex gap-2">
        <div
          className="text-xl cursor-pointer"
          title={todo.id}
          onClick={() => handleCheckbox(todo.id, todo.completed)}
        >
          {todo.completed ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </div>

        <div className={`text-sm ${todo.completed ? "line-through" : ""}`}>
          {todo.body}
        </div>
      </div>

      <div className="font-medium flex gap-2">
        <span className="text-xl cursor-pointer">
          <label
            htmlFor="my_modal_6"
            className=""
            onClick={() =>
              setEditTodo({
                id: todo.id,
                body: todo.body,
              })
            }
          >
            <MdOutlineEdit />
          </label>
        </span>
        <span className="text-xl cursor-pointer">
          <MdOutlineDelete onClick={() => handleDelete(todo.id)} />
        </span>
      </div>
    </div>
  );
};

export default TodoBox;
