import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todoUrl = "https://jsonplaceholder.typicode.com/todos";
  todosLimit = "?_limit=5";

  constructor(private http: HttpClient) {}

  //  Get todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}${this.todosLimit}`);
  }

  //  Add Todo
  addTodo(todo: Todo): Observable<Todo> {
    console.log("adding todo : ", todo);
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions);
  }

  //  Toggle Completed
  toggleCompleted(todo: Todo): Observable<Todo[]> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put<Todo[]>(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo[]> {
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo[]>(url, httpOptions);
  }
}
