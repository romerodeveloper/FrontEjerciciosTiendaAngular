import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Tienda } from '../interfaces/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  URL = 'http://localhost:3000/api/store';

  constructor(private http: HttpClient) { }

  getStores(): Observable<any> {
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

  createTienda(tienda: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const urlParam = `${this.URL}/${tienda.name}`;

    return this.http.post<any>(urlParam, tienda, httpOptions )// Envía los parámetros en la solicitud
      .pipe(
        map((res) => {
          return res; // Devuelve la respuesta
        }),
        catchError(this.handleError) // Manejo de errores
      );
  }

  updateTienda(tienda: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const urlParam = `${this.URL}/${tienda.id}`;

    return this.http.put<any>(urlParam, tienda, httpOptions )
      .pipe(
        map((res) => {
          return res; 
        }),
        catchError(this.handleError) 
      );
  }

  getTiendaByName(name: string): Observable<any> {
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

  deleteStore(name: string): Observable<any> {
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
