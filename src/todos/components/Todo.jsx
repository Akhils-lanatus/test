import React, { useState, useEffect } from "react";
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
    id: new Date().getTime(),
    title: "",
    scheduled: false,
  });
  const [todoType, setTodoType] = useState("all");
  const [isUpdate, setIsUpdate] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    switch (todoType) {
      case "all":
        setFilteredData(allTodos);
        break;
      case "scheduled":
        setFilteredData(scheduledTodos.filter((todo) => todo.scheduled));
        break;
      case "notScheduled":
        setFilteredData(notScheduledTodos.filter((todo) => !todo.scheduled));
        break;
      default:
        setFilteredData([]);
    }
  }, [todoType, allTodos, scheduledTodos, notScheduledTodos]);

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
    setTodo({ title: "", scheduled: false, id: new Date().getTime() });
    setIsUpdate(false);
    updateTypeAndState(todoType ?? "all");
  }

  function handleEdit(todo) {
    setIsUpdate(true);
    setTodo(todo);
    updateTypeAndState(todoType ?? "all");
  }

  function handleDelete(id) {
    removeTodo(id);
    updateTypeAndState(todoType ?? "all");
  }

  function updateTypeAndState(value) {
    setTodoType(value);
    if (value === "all") getAllTodos();
    else if (value === "scheduled") getScheduledTodos();
    else if (value === "notScheduled") getNotScheduledTodos();
    else setFilteredData([]);
  }

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
          <label htmlFor="scheduler">Scheduled?</label>
          <input
            onChange={(e) => setTodo({ ...todo, scheduled: e.target.checked })}
            type="checkbox"
            name="scheduler"
            id="scheduler"
            value={todo.scheduled}
            checked={todo.scheduled}
          />
        </div>
        <button>{isUpdate ? "Update" : "Add"} Todo</button>
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

      <div>
        <input
          onChange={(e) => updateTypeAndState(e.target.value)}
          type="radio"
          name="todoType"
          value="all"
          checked={todoType === "all"}
          disabled={isUpdate}
        />
        <label htmlFor="all">All</label>
        <input
          onChange={(e) => updateTypeAndState(e.target.value)}
          type="radio"
          name="todoType"
          value="scheduled"
          checked={todoType === "scheduled"}
          disabled={isUpdate}
        />
        <label htmlFor="scheduled">Scheduled</label>
        <input
          onChange={(e) => updateTypeAndState(e.target.value)}
          type="radio"
          name="todoType"
          value="notScheduled"
          checked={todoType === "notScheduled"}
          disabled={isUpdate}
        />
        <label htmlFor="notScheduled">Not Scheduled</label>
      </div>

      {filteredData.length > 0 ? (
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
              {filteredData.map((todo) => (
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
      ) : (
        <p>No Todos to display</p>
      )}
    </>
  );
};

export default Todo;
