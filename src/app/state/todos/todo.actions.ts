import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo/todo.model';

// un'action è una const esportata
// per creare un'action si utilizza il metodo di ngrx createAction()
// primo argomento nome dell'action, string
// il secondo argomento è un payload che vogliamo passare insieme all'action
export const addTodo = createAction(
  // è convenzione nominare le actions mettendo tra quadre il modulo o il componente dove vengono utilizzate le actions
  '[Todo Page] Add Todo',
  // quando faccio il dispatch di questa action gli devo passare come parametro un oggetto con la proprietà content di tipo string
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
