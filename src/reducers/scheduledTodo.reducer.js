import * as constants from "../constants/global";

export const scheduledTodoReducer = (state = [], action) => {
  switch (action.type) {
    case constants.scheduledTodosTypes.GET_SCHEDULED_TODOS:
      return state.filter((todo) => todo.scheduled);
    case constants.todoTypes.ADD_TODO:
      return [...state, action.payload];
    case constants.todoTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case constants.todoTypes.EDIT_TODO:
      return state.map((todo) => {
        todo.id === action.payload.id ? action.payload : todo;
      });
    default:
      return state;
  }
};
