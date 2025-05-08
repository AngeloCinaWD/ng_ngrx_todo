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
  // durante il caricamento dei dati utilizziamo lo state attuale e cambiamo lo status di questo in loading
  on(loadTodos, (state) => ({ ...state, status: 'loading' })),

  // Handle successfully loaded todos
  // in caso di successo del caricamento modifichiamo la proprietà todos dello state coi nuovi dati arrivati dal backend
  // non ci sarà errore
  // lo status diventa success
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success',
  })),

  // Handle todos load failure
  // in caso di errore i dati rimangono gli stessi dello state attuale
  // si avrà un messaggio di errore
  // lo status è error
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
