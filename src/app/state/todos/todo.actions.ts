import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo/todo.model';

export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ content: string }>()
);

export const removeTodo = createAction(
  '[Todo Page] Remove Todo',
  props<{ id: string }>()
);

// per utilizzare gli effects di NgRx creiamo altre 3 actions

// una per caricare tutti i Todo
export const loadTodos = createAction('[Todo Page] Load Todos');

// una in caso riesca il caricamento
// nella props verranno passati tutti i Todo
export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[] }>()
);

// una in caso di errore nel caricamento
// nella props viene passato il messaggio di errore
export const loadTodosFailure = createAction(
  '[Todo API] Todo Load Failure',
  props<{ error: string }>()
);
