import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo'
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  newTodoText: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todos = this.todoService.getTodos();
      // .subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

}
