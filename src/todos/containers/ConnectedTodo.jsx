import { connect } from "react-redux";
import Todo from "../components/Todo";
import {
  addTodo,
  editTodo,
  getAllTodos,
  getNotScheduledTodos,
  getScheduledTodos,
  removeTodo,
} from "../actions/todo.action";

const mapStateToProps = (state) => ({
  allTodos: state.todos,
  scheduledTodos: state.scheduledTodos,
  notScheduledTodos: state.notScheduledTodos,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodos: () => dispatch(getAllTodos()),
    getScheduledTodos: () => dispatch(getScheduledTodos()),
    getNotScheduledTodos: () => dispatch(getNotScheduledTodos()),
    addTodo: (todo) => dispatch(addTodo(todo)),
    editTodo: (todo) => dispatch(editTodo(todo)),
    removeTodo: (id) => dispatch(removeTodo(id)),
  };
};
export const ConnectedTodo = connect(mapStateToProps, mapDispatchToProps)(Todo);
