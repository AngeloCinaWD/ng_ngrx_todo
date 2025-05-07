import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TodoState } from './todo.reducer';

// creo una const che è una funzione che accetta come parametro lo state della mia app e restituisce la proprietà todos
// quindi restituisce un array contenente oggetti Todo
export const selectTodos = (state: AppState) => state.todos;

// creo un selector tramite metodo createSelector(), il primo argomento è lo state che mi interessa, il secondo è la callback che definisce cosa deve ritornare il selector
export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos
);
