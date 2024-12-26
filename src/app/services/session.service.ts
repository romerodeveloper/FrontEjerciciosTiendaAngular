import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  URL = 'http://localhost:3000/api';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.URL + '/auth', user, httpOptions);
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem(this.tokenKey);
    return token !== null; 
  }
}
