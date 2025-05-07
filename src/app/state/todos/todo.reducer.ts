import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  removeTodo,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
} from './todo.actions';
import { Todo } from '../../todo/todo.model';

// lo state può essere visto come un grosso oggetto di dati
// definisco un'interface per lo state
// è un oggetto con 3 proprietà:
// todos: array di oggetti Todo
// error: una stringa che mi consenta di gestire un eventuale errore nella gestione dello state
// status: una stringa che mi definisca lo stato dello state
export interface TodoState {
  todos: Todo[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

// creo uno state iniziale: array vuoto, null per error e pending per lo status (in attesa)
export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending',
};

// creo un reducer tramite createReducer() method
// un reducer deve avere come primo parametro lo state, per gestirlo
export const todoReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array
  // il metodo on() mi permette di definire diefinire cosa deve essere fatto quando una certa action (indicata con il nome) viene dispatchata
  // la callback del metodo on() ha come primo parametro lo state attuale (quello passato come primo parametro al createReducer())
  // il secondo parametro è il payload definito al momento della creazione dell'action, quindi per addTodo era un oggetto contenente una proprietà content. Tramite destrutturazione di un oggetto ottengo una variabile con nome content col valore del content nella prop passata al momento del dispatch dell'action nel component
  on(addTodo, (state, { content }) =>
    // questa callback ritorna un nuovo oggetto state (di tipo AppState) che ha una proprietà todos che è un array di Todo più il nuovo Todo che ha 2 proprietà: id e content
    // todos è la proprietà dell'oggetto state: tramite spread operator estraggo la proprietà todos dallo state e la vado a sosituire con una nuova proprietà todos che (sempre utilizzando lo spread operator) è un array composto da tutti gli elementi che c'erano nel precedente state in todos più quello nuovo creato
    ({
      ...state,
      todos: [...state.todos, { id: Date.now().toString(), content: content }],
    })
  ),
  // Remove the todo from the todos array
  // per il remove facciamo la stessa cosa dell'add ma tramite .filter() filtriamo tutti i vecchi Todo ottenendo un array senza quello che ha l'id uguale a quello passato come props nel momento del dispatch dell'action
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
