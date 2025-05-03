import React, { useEffect, useState } from "react";
import "../styles/Todo.css";
const Todo = ({
  allTodos,
  scheduledTodos,
  notScheduledTodos,
  getAllTodos,
  getScheduledTodos,
  getNotScheduledTodos,
  editTodo,
  addTodo,
  removeTodo,
}) => {
  const [todo, setTodo] = useState({
    title: "",
    scheduled: false,
    id: new Date().getTime(),
  });
  const [data, setData] = useState([]);
  const [todoType, setTodoType] = useState("all");
  const [isUpdate, setIsUpdate] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!todo.title || !todo.title.trim()) {
      alert("Please enter a title");
      return;
    }

    const payload = {
      id: todo.id,
      title: todo.title,
      scheduled: todo.scheduled,
    };
    isUpdate ? editTodo(payload) : addTodo(payload);
    setTodo({ title: "", scheduled: false });
    setIsUpdate(false);
  }

  function handleEdit(todo) {
    setIsUpdate(true);
    setTodo(todo);
  }

  function handleDelete(id) {
    removeTodo(id);
  }

  function handleTypeChange(value) {
    setTodoType(value);
    switch (value) {
      case "all":
        getAllTodos();
        setData(allTodos);
        break;
      case "scheduled":
        getScheduledTodos();
        setData(scheduledTodos);
        break;
      case "notScheduled":
        getNotScheduledTodos();
        setData(notScheduledTodos);
        break;
      default:
        setData([]);
    }
  }
  useEffect(() => {
    handleTypeChange(todoType || "all");
  }, [todoType, todo]);

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
        <button>{isUpdate ? "Update" : "Add"} todo</button>
        {isUpdate && (
          <button
            type="button"
            onClick={() => {
              setIsUpdate(false);
              setTodo({ title: "", scheduled: false });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="all"
        checked={todoType === "all"}
        disabled={isUpdate}
      />
      <label htmlFor="all">All</label>
      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="scheduled"
        checked={todoType === "scheduled"}
        disabled={isUpdate}
      />
      <label htmlFor="scheduled">Scheduled</label>
      <input
        onChange={(e) => handleTypeChange(e.target.value)}
        type="radio"
        name="todoType"
        value="notScheduled"
        checked={todoType === "notScheduled"}
        disabled={isUpdate}
      />
      <label htmlFor="notScheduled">Not Scheduled</label>
      {(data ?? []).length > 0 && (
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
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                    <button onClick={() => handleDelete(todo.id)}>
                      Delete
                    </button>
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

export default Todo;
