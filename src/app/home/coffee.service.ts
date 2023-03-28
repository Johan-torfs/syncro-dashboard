import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { Coffee } from './coffee';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private httpClient: HttpClient) { }

  getCoffee(): Observable<Coffee> {
    return timer(1, 30000).pipe(switchMap(() => this.httpClient.get<Coffee>('http://192.168.42.40:8123/api/states/counter.coffee', {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiODZiYjYxODE3NDA0N2MxYTFkODE4Zjk0YWM2OGRmMCIsImlhdCI6MTY3OTk5MzgzNiwiZXhwIjoxOTk1MzUzODM2fQ.idFK5DiZPyHrvJpnKS1rGcjJOiJQIV9T1ZT4wYyRCjE'}})));
  }
}
