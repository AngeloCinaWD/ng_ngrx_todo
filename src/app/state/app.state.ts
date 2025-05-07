import { TodoState } from './todos/todo.reducer';

// l'interfaccia AppState mi serve per definire come deve essere composto lo state dell'app
// è un oggetto con tante proprietà (in questo caso solo todos)
// potrei avere altre proprietà, ad esempio auth di tipo AuthState, un'interfaccia AuthState con le proprietà che mi servono per definire l'autenticazione
export interface AppState {
  todos: TodoState;
}
