import React, { useState } from "react";
import axios from "axios";
import TodoBox from "./TodoBox";

const Table = ({ todos, setTodos }) => {
  const completed = todos.filter((todo) => todo.completed === true);
  const itemsLeft = todos.length - completed.length;

  const [editTodo, setEditTodo] = useState({
    id: null,
    body: "",
  });

  const handleChange = (e) => {
    setEditTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editTodo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      console.log(response.data);
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  const saveTodo = () => {
    handleEdit(editTodo.id, {
      body: editTodo.body,
    });
  };

  return (
    <div className="py-20">
      <div className="w-11/12 max-w-4xl">
        <div className="rounded bg-cyan-900 divide-y divide-cyan-800">
          {todos.map((todo) => (
            <TodoBox
              key={todo.id}
              todo={todo}
              handleCheckbox={handleCheckbox}
              handleDelete={handleDelete}
              setEditTodo={setEditTodo}
            />
          ))}
          <div className="p-3 flex justify-between">
            <span>
              {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
            </span>
            <span>Clear completed</span>
          </div>
        </div>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Todo</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={editTodo.body}
            onChange={handleChange}
          />
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              className="btn btn-primary"
              onClick={() => saveTodo()}
            >
              Save
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
