import React from "react";

const TodoAddUpdate = ({
  todo,
  setTodo,
  isUpdate,
  setIsUpdate,
  handleSubmit,
}) => (
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
);

export default TodoAddUpdate;
