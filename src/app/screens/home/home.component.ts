import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodos } from 'src/app/interfaces/ITodos';
import { axiosInstance } from 'src/app/shared/axios/axiosInstance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public todos: ITodos[] = [];
  public todos$ = new Observable<ITodos[]>((observer) => {
    axiosInstance.get('todos')
     .then((res) => {
      const todos: ITodos[] = res.data;
      observer.next(todos);
      observer.complete();
     })
     .catch((error) => observer.error(error));
  });

  constructor() { }

  ngOnInit(): void {
    this.todos$.subscribe((_todos) => this.todos = _todos);
  }
}
