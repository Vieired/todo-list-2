import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Todo } from "src/models/todo.models";
import { delay, take, tap } from 'rxjs/operators'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    private readonly API = `${environment.API}todoList`

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Todo[]>(this.API)
            .pipe(
                delay(2000),
                tap(console.log)
            );
    }

    listById(id: string) {
        const url = `${this.API}?id=${id}`
        return this.http.get<Todo[]>(url)
            .pipe(
                delay(2000),
                tap(console.log)
            );
    }

    create(todo: Todo) {
        // const randomId = Math.ceil(Math.random() * Math.pow(10,4));
        return this.http.post(this.API, todo)
            .pipe(
                tap(console.log),
                take(1)
            );
    }

    delete(id: string) {
        return this.http.delete(`${this.API}/${id}`)
            .pipe(
                tap(console.log),
                take(1)
            )
    }

    update(todo: Todo) {
        return this.http.put(`${this.API}/${todo.id}`, todo)
            .pipe(
                tap(console.log),
                take(1)
            )
    }
}