import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTodo,
  removeTodo,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';
import { TodoService } from '../../todo/todo.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllTodos } from './todo.selectors';
import { AppState } from '../app.state';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  // Run this code when a loadTodos action is dispatched
  // per creare un effect viene utilizzato il metodo createEffect()
  loadTodos$ = createEffect(() =>
    // per far funzionare un effect utilizziamo lo stream creato dalla classe Actions di NgRx che permette di essere in ascolto di tutte le actions create
    // indichiamo quale è l'action dispatchata tramite il pipe operator ofType()
    this.actions$.pipe(
      ofType(loadTodos),
      // nel momento in cui questa action emette un value
      // con lo switchMap() operator di RxJs possiamo switchare ad un altro observable da noi creato per la chiamata al BE
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        // devo utilizzare il from() perchè il metodo nel service mi restituisce una Promise e quindi la converto in un observable
        from(this.todoService.getTodos()).pipe(
          // Take the returned value and return a new success action containing the todos
          // devo effettuare il dispatch dell'action per il success dell'operazione e gli passo come proprs i dati arrivati dal BE
          map((todos) => loadTodosSuccess({ todos: todos })),
          // Or... if it errors return a new failure action containing the error
          // in caso di errore dispatcho l'action per l'error
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addTodo or removeTodo action is dispatched
  saveTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        // questo effect è in ascolto delle actions per salvare un nuovo todo o per eliminarne uno
        ofType(addTodo, removeTodo),
        // prendiamo gli ultimi dati nello store
        withLatestFrom(this.store.select(selectAllTodos)),
        // e li passiamo al metodo nel service per salvarli nel backend
        switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
      ),
    // non facciamo il dispatch di una ction perchè il salvataggio nel DB non va ad influire sullo state dell'app
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
