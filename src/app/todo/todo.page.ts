import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, removeTodo, loadTodos } from '../state/todos/todo.actions';
import { selectAllTodos } from '../state/todos/todo.selectors';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage implements OnInit {
  // per recuperare dati dallo store si utilizza il metodo .select() passandogli come argomento il nome del selector che ci interessa
  // il .select() restituisce uno stream di dati, un observable, cioè ogni volta che i dati cambiano nello store automaticamente vengono aggiornati dove sono richiesti
  public allTodos$ = this.store.select(selectAllTodos);
  public todo = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  addTodo() {
    this.store.dispatch(addTodo({ content: this.todo }));
    this.todo = '';
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
