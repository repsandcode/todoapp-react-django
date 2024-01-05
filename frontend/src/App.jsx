import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      console.log(response.data.reverse());
      setTodos(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 min-h-screen flex justify-center items-center">
      <div className="w-full sm:w-10/12 md:w-6/12 max-w-4xl">
        <nav className="py-8">
          <h1 className="text-2xl">Today's todo list</h1>
        </nav>
        <div className="">
          <TodoForm />
          <Table todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
