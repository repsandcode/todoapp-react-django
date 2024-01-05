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
      const all = response.data;
      
      console.log(all);
      setTodos(all);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 min-h-screen">
      <nav className="pt-8">
        <h1 className="text-2xl">Today's todo list</h1>
      </nav>
      <TodoForm />
      <Table todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
