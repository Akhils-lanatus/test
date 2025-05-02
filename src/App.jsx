import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.todos);
  const allScheduledTodos = useSelector((state) => state.scheduledTodos);
  const allNotScheduledTodos = useSelector((state) => state.notScheduledTodos);

  const [todo, setTodo] = useState({
    title: "",
    scheduled: false,
  });

  const [data, setData] = useState([]);

  const [todoType, setTodoType] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    if (!todo.title || !todo.title.trim()) {
      alert("Please enter a title");
      return;
    }

    const id = new Date().getTime();
    const payload = {
      id,
      title: todo.title,
      scheduled: todo.scheduled,
    };
    dispatch({ type: "ADD_TODO", payload });
    handleTypeChange(todoType);
    setTodo({ title: "", scheduled: false });
  }

  function handleTypeChange(value) {
    setTodoType(value);
    switch (value) {
      case "all":
        dispatch({ type: "GET_ALL_TODOS" });
        setData(allTodos);
        break;
      case "scheduled":
        dispatch({ type: "GET_SCHEDULED_TODOS" });
        setData(allScheduledTodos);
        break;
      case "notScheduled":
        dispatch({ type: "GET_NOT_SCHEDULED_TODOS" });
        setData(allNotScheduledTodos);
        break;
      default:
        setData([]);
    }
  }
  useEffect(() => {
    handleTypeChange(todoType || "all");
  }, [allTodos, todoType]);

  return (
    <>
      <h1>Todo:</h1>
      <form
        style={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            type="text"
            name="title"
            id="title"
            value={todo.title}
          />
        </div>
        <div>
          <label htmlFor="scheduler">Scheduled??</label>
          <input
            onChange={(e) => setTodo({ ...todo, scheduled: e.target.checked })}
            type="checkbox"
            name="scheduler"
            id="scheduler"
            value={todo.scheduled}
            checked={todo.scheduled}
          />
        </div>
        <button>Add todo</button>
      </form>

      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="all"
        checked={todoType === "all"}
      />
      <label htmlFor="all">All</label>
      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="scheduled"
        checked={todoType === "scheduled"}
      />
      <label htmlFor="scheduled">Scheduled</label>
      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="notScheduled"
        checked={todoType === "notScheduled"}
      />
      <label htmlFor="notScheduled">Not Scheduled</label>
      {data.length > 0 && (
        <>
          <br />
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Scheduled</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {data.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>{todo.scheduled ? "Yes" : "No"}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default App;
