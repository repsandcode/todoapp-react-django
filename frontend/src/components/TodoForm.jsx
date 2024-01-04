import React, { useState } from "react";
import axios from "axios";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(newTodo);
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 flex">
      <form onSubmit={postTodo} className="w-full flex">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Add Todo</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary ml-2 self-end">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
