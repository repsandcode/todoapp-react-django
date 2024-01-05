import React, { useState } from "react";
import axios from "axios";

import { GoCheckCircle, GoCircle } from "react-icons/go";

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
    <div className="rounded bg-slate-800 divide-y divide-slate-700">
      <form onSubmit={postTodo}>
        <div className="flex px-6 py-5 gap-3">
          <div className="self-center text-xl cursor-pointer text-sky-500">
            <GoCircle />
          </div>

          <input
            type="text"
            className="outline-none w-full text-base bg-transparent"
            placeholder="Type here"
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
