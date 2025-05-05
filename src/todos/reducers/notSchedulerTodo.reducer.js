import * as constants from "../../constants/global";

export const notScheduledTodoReducer = (state = [], action) => {
  switch (action.type) {
    case constants.notScheduledTodosTypes.GET_NOT_SCHEDULED_TODOS:
      return state.filter((todo) => !todo.scheduled);
    case constants.todoTypes.ADD_TODO:
      return [...state, action.payload];
    case constants.todoTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case constants.todoTypes.EDIT_TODO: {
      const updatedTodo = action.payload;
      if (!updatedTodo.scheduled) {
        const exists = state.some((todo) => todo.id === updatedTodo.id);
        if (exists) {
          return state.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
          );
        } else {
          return [...state, updatedTodo];
        }
      }
      return state.filter((todo) => todo.id !== updatedTodo.id);
    }
    default:
      return state;
  }
};
