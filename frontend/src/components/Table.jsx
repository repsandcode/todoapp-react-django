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

  const handleDelete = () => {
    try {
      // Make a DELETE request to delete all completed todos
      axios
        .delete("http://127.0.0.1:8000/api/todo/delete-completed/")
        .then((response) => {
          console.log("Delete all completed tasks.");
          console.log(response);
          // You may want to update the state or trigger a refresh
          const newList = todos.filter((todo) => todo.completed !== true);
          setTodos(newList);
        })
        .catch((error) => {
          console.error("Error during bulk deletion:", error);
        });
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
    <div className="py-8">
      <div className="rounded bg-slate-800 divide-y divide-slate-700">
        {todos.map((todo) => (
          <TodoBox
            key={todo.id}
            todo={todo}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
            setEditTodo={setEditTodo}
          />
        ))}
        <div className="px-6 py-4 flex justify-between text-sm">
          <span>
            {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
          </span>
          <span className="cursor-pointer" onClick={() => handleDelete()}>
            Clear completed
          </span>
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
