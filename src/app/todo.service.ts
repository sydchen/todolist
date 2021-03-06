import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];

  constructor() { 
		let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
		// Normalize back into classes
		this.todos = persistedTodos.map( (todo: {_title: String, completed: Boolean}) => {
			let ret = new Todo(todo._title);
			ret.completed = todo.completed;
			return ret;
		});
  }

  private updateStore() {
    localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
  }

  private getWithCompleted(completed: Boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: Boolean) {
    this.todos.forEach((t: Todo) => t.completed = completed);
    this.updateStore();
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: String) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }
}
