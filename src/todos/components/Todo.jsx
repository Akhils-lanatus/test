import React, { useState, useEffect } from "react";
import "../styles/Todo.css";
import TodoList from "./TodoList";
import TodoAddUpdate from "./TodoAddUpdate";

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
        setFilteredData(scheduledTodos);
        break;
      case "notScheduled":
        setFilteredData(notScheduledTodos);
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

  const radioButtons = [
    { value: "all", label: "All" },
    { value: "scheduled", label: "Scheduled" },
    { value: "notScheduled", label: "Not Scheduled" },
  ];

  return (
    <>
      <h1>Todo:</h1>

      <TodoAddUpdate
        todo={todo}
        setTodo={setTodo}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        handleSubmit={handleSubmit}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {radioButtons.map(({ value, label }) => (
          <div key={value}>
            <input
              onChange={(e) => updateTypeAndState(e.target.value)}
              type="radio"
              name="todoType"
              value={value}
              checked={todoType === value}
              disabled={isUpdate}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        ))}
      </div>

      {filteredData.length > 0 ? (
        <TodoList
          filteredData={filteredData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <p>No Todos to display</p>
      )}
    </>
  );
};

export default Todo;
