import * as constants from "../../constants/global";
export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case constants.todoTypes.GET_TODOS:
      return state;
    case constants.todoTypes.ADD_TODO:
      return [...state, action.payload];
    case constants.todoTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case constants.todoTypes.EDIT_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    }
    default:
      return state;
  }
};
