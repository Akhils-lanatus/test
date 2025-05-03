import { combineReducers } from "redux";
import { todoReducer } from "../todos/reducers/todos.reducer";
import { scheduledTodoReducer } from "../todos/reducers/scheduledTodo.reducer";
import { notScheduledTodoReducer } from "../todos/reducers/notSchedulerTodo.reducer";
export const rootReducer = combineReducers({
  todos: todoReducer,
  scheduledTodos: scheduledTodoReducer,
  notScheduledTodos: notScheduledTodoReducer,
});
