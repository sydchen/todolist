import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() { 
    this.getTodos('all');
    this.route.fragment.subscribe(fragment => {
      this.getTodos(fragment);
    })
  }

  getTodos(selected): void {
    if(selected === "completed") {
      this.todos = this.todoService.getTodos().filter(todo => todo.completed === true);
    }
    else if(selected === "active") {
      this.todos = this.todoService.getTodos().filter(todo => todo.completed !== true);
    }
    else {
      this.todos = this.todoService.getTodos();
    }
  }

	stopEditing(todo: Todo, editedTitle: string) {
		todo.title = editedTitle;
		todo.editing = false;
	}

	cancelEditingTodo(todo: Todo) {
		todo.editing = false;
	}

	updateEditingTodo(todo: Todo, editedTitle: string) {
		editedTitle = editedTitle.trim();
		todo.editing = false;

		if (editedTitle.length === 0) {
			return this.todoService.remove(todo);
		}
		todo.title = editedTitle;
	}

  allCompleted() {
    return this.todoService.allCompleted();
  }

  editTodo(todo) {
    todo.editing = true;
  }

  setAllTo(completed: Boolean) {
    this.todoService.setAllTo(completed);
  }

	removeCompleted() {
		this.todoService.removeCompleted();
	}

	toggleCompletion(todo: Todo) {
		this.todoService.toggleCompletion(todo);
	}

  remove(todo: Todo) {
    this.todoService.remove(todo);
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }
}
