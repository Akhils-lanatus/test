import React from "react";

const TodoList = ({ filteredData, handleEdit, handleDelete }) => {
  return (
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
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
