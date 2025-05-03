import * as constants from "../../constants/global";

const addTodo = (todo) => {
  return {
    type: constants.todoTypes.ADD_TODO,
    payload: todo,
  };
};

const editTodo = (todo) => {
  return {
    type: constants.todoTypes.EDIT_TODO,
    payload: todo,
  };
};

const getAllTodos = () => {
  return {
    type: constants.todoTypes.GET_TODOS,
  };
};

const removeTodo = (id) => {
  return {
    type: constants.todoTypes.REMOVE_TODO,
    payload: id,
  };
};

const getScheduledTodos = () => {
  return {
    type: constants.scheduledTodosTypes.GET_SCHEDULED_TODOS,
  };
};
const getNotScheduledTodos = () => {
  return {
    type: constants.notScheduledTodosTypes.GET_NOT_SCHEDULED_TODOS,
  };
};
export {
  addTodo,
  editTodo,
  getAllTodos,
  removeTodo,
  getScheduledTodos,
  getNotScheduledTodos,
};
