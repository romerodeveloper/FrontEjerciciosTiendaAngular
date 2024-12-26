import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Articulo } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

   URL = 'http://localhost:3000/api/item';
  
    constructor(private http: HttpClient) { }
  
    getItems(): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<any>(this.URL + '/', httpOptions)
        .pipe(
          map((res) => {
            return res;
          }),
          catchError(this.handleError)
        )
    }
  
    createItem(articulo: any): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
  
      const urlParam = `${this.URL}/${articulo.name}`;
  
      return this.http.post<any>(urlParam, articulo, httpOptions )
        .pipe(
          map((res) => {
            return res; 
          }),
          catchError(this.handleError) 
        );
    }
  
    updateItem(articulo: any): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
  
      const urlParam = `${this.URL}/${articulo.name}`;
  
      return this.http.put<any>(urlParam, articulo, httpOptions )
        .pipe(
          map((res) => {
            return res; 
          }),
          catchError(this.handleError) 
        );
    }
  
    getItemByName(name: string): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      const urlParam = `${this.URL}/${name}`; 
      return this.http.get<any>(urlParam, httpOptions).pipe(
        map(res => res),
        catchError(this.handleError)
      );
    }
  
    deleteItem(name: string): Observable<any> {
      const token = sessionStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      const urlParam = `${this.URL}/${name}`; 
      return this.http.delete<any>(urlParam, httpOptions).pipe(
        map(res => res),
        catchError(this.handleError)
      );
    }
      
    private handleError(error: HttpErrorResponse): Observable<any> {
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        console.error('Ocurrió un error:', error.error.message);
      } else {
        // Error del lado del servidor
        console.error(`Código de error: ${error.status}, ` + `Mensaje: ${error.error}`);
      }
      // Retornar un observable con un mensaje de error
      return throwError(() => 'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
}
