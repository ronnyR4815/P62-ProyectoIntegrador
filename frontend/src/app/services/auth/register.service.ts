import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ username: '', email: '', tipo: ''});

  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  register(userInfo: User): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, userInfo).pipe(
      tap((userData: User) => {
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData);
      }),
      catchError(this.handlerError)
    );
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se ha producido un error", error.error);
    } else {
      console.error("Backend retorno codigo de estado", error.status, error.error);
    }
    return throwError(() => new Error("Algo fallo, por favor intente nuevamente"));
  }
}