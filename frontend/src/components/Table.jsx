import React, { useState } from "react";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import axios from "axios";


const Table = ({ todos, setTodos }) => {

  const [editTodo, setEditTodo] = useState({
    'id': null,
    'body': '', 
  })

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
      const newList = todos.filter(todo => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value);
      console.log(response.data);
      const newTodos = todos.map(todo => todo.id === id? response.data : todo);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckbox = (id, value) => {
   handleEdit(id, {
    'completed': !value,
   })
  }

  const saveTodo = () => {
    handleEdit(editTodo.id, {
      'body': editTodo.body,
    })
  }

  return (
    <div className="py-20">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Task
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Created at
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Updated at
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="p-3">
                <span 
                className="inline-block cursor-pointer"
                title={todo.id}
                onClick={() => handleCheckbox(todo.id, todo.completed)}>
                  {todo.completed ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </span>
              </td>
              <td className="p-3 text-sm">{todo.body}</td>
              <td className="p-3 text-sm">
                <span
                  className={`p-1.5 text-sm font-medium tracking-wider rounded-md text-black ${
                    todo.completed ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  {todo.completed ? "Done" : "Incomplete"}
                </span>
              </td>
              <td className="p-3 text-sm">{new Date(todo.created).toLocaleString()}</td>
              <td className="p-3 text-sm">{new Date(todo.updated).toLocaleString()}</td>
              <td className="p-3 text-sm font-medium flex gap-4">
                <span className="text-xl cursor-pointer">
                  {/* The button to open modal */}
                  <label 
                    htmlFor="my_modal_6" 
                    className="btn" 
                    onClick={() => setEditTodo({
                      'id': todo.id,
                      'body': todo.body,
                    })}>
                      <MdOutlineEdit />
                  </label>
                </span>
                <span className="text-xl cursor-pointer">
                  <MdOutlineDelete onClick={() => handleDelete(todo.id)} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Todo</h3>
          <input type="text" placeholder="Type here" className="input input-bordered w-full" value={editTodo.body} onChange={handleChange} />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-primary" onClick={() => saveTodo()}>Save</label>
            <label htmlFor="my_modal_6" className="btn">Close</label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Table;
