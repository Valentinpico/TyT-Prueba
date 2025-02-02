import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoDraft, ToDoDto, UserDTO } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class ToDoStateService {
  private _todos = new BehaviorSubject<ToDoDto[]>([]);
  public todos$ = this._todos.asObservable();

  setTodos(todos: ToDoDto[]) {
    this._todos.next(todos);
  }
  todos(): ToDoDto[] {
    return this._todos.getValue();
  }

  private _todoSelected = new BehaviorSubject<ToDoDto | null>(null);
  public todoSelected$ = this._todoSelected.asObservable();

  setTodoSelected(todo: ToDoDto | null) {
    this._todoSelected.next(todo);
  }
  todoSelected(): ToDoDto | null {
    return this._todoSelected.getValue();
  }

  addTodo(todo: ToDoDraft) {
    const todos = this.todos();
    this.setTodos([
      ...todos,
      {
        ...todo,
        TodoID: 0,
      },
    ]);
  }

  toggleTodo(TodoID: number) {
    const todos = this.todos();

    const todotoggle = todos.map((todo) =>
      todo.TodoID === TodoID ? { ...todo, Completed: !todo.Completed } : todo
    );

    todotoggle.sort((a, b) =>
      a.Completed === b.Completed ? 0 : a.Completed ? 1 : -1
    );
    this.setTodos(todotoggle);
  }

  deleteTodo(TodoID: number) {
    const todos = this.todos();
    this.setTodos(todos.filter((todo) => todo.TodoID !== TodoID));
  }

  updateTodo(todo: ToDoDto) {
    const todos = this.todos();
    const todosUpdated = todos.map((t) =>
      t.TodoID === todo.TodoID ? todo : t
    );
    this.setTodos(todosUpdated);
  }
}
