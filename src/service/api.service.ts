import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlApi="http://openlibrary.org/search/lists.json?q=book"

  constructor( private httpService:HttpClient) { }

  getBooksNumber(numberBooks:number): Observable<any> {
    const url = `${this.urlApi}&limit=${numberBooks}&offset=0`;
    return this.httpService.get(url);
  }

  getBooks(): Observable<any> {
    const url = `${this.urlApi}&limit=${100}&offset=0`;
    return this.httpService.get(url);
  }
}
