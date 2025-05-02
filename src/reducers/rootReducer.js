import { combineReducers } from "redux";
import { todoReducer } from "./todos.reducer";
import { scheduledTodoReducer } from "./scheduledTodo.reducer";
import { notScheduledTodoReducer } from "./notSchedulerTodo.reducer";

export const rootReducer = combineReducers({
  todos: todoReducer,
  scheduledTodos: scheduledTodoReducer,
  notScheduledTodos: notScheduledTodoReducer,
});
