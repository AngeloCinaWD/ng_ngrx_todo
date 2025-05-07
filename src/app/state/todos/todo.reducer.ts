// un reducer è la parte dell'app che controlla se un'action viene spedita e fa qualcosa per modificare lo state dell'app
// di solito si ha un reducer per ogni feature o entità dell'app, come i todos, l'auth, articles etc
// registrano il nuovo store nello store dell'app
// lo store di solito è globale ed è dove lo state dell'app vive
// può essere visto come un grande oggetto di dati
// i reducers sono pure functions, cioè passando sempre lo stesso input si ottiene sempre lo stesso output. Non producono side effects
import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  removeTodo,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';
import { Todo } from '../../todo/todo.model';

export interface TodoState {
  todos: Todo[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending',
};

export const todoReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  on(addTodo, (state, { content }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), content: content }],
  })),
  // Remove the todo from the todos array
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  // Trigger loading the todos
  on(loadTodos, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded todos
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
