import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from 'src/models/todo.models';
import { TodoListService } from './app.service';

@Component({
  selector: 'app-root', // <app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public todos: Todo[] = [];
  todoList: Todo[];
  todoList$: Observable<Todo[]>;
  displayedColumns: string[] = ['title', 'done', 'actions'];
  dataSource: Todo[];

  constructor(
    private fb: FormBuilder,
    private service: TodoListService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      done: [null]
    })
    
    // this.load();
  }

  ngOnInit() {
    // this.service.list()
    //   .subscribe(data => this.todoList = data);

    this.load();
  }

  load() {
    this.todoList$ = this.service.list();
    this.service.list()
      .subscribe(data => {
        this.dataSource = data;
      });
  }

  addTodo() {
    // if(this.form.controls['done'].value !== true)
    this.form.controls['done'].setValue(false);

    console.log(this.form.value)
    if(this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => console.log('sucesso'),
        error => console.error(error),
        () => {
          console.log('request completo');
          this.form.reset();
          this.load();
        }
      );
    }
  }

  removeTodo(id: string) {
    this.service.delete(id).subscribe(
      success => console.log('sucesso'),
      error => console.error(error),
      () => {
        console.log('request completo');
        this.load();
      }
    );
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.service.update(todo).subscribe(
      success => console.log('sucesso'),
      error => console.error(error),
      () => {
        console.log('request completo');
      }
    );
  }
}
