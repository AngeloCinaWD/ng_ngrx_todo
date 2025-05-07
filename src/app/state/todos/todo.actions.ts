// un componenente dispatches an action per indicare che qualcosa è successo
// quando un'action viene dispatchata deve essere immediatamente gestita da un reducer, è codice sincrono
// per eseguire qualcosa di asincrono si utizzano gli effects
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

export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo API] Todo Load Failure',
  props<{ error: string }>()
);
