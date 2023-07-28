import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ username: '', email: '', tipo: '' });
  currentAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.url}/users`);
  }

  // getUserByEmailAndPassword(email: string, password: string): Observable<User> {
  //   const credentials: LoginRequest = { email, password };
  //   return this.http.post<User>(`${this.url}/login`, credentials).pipe(
  //     tap((userData: User) => {
  //       this.currentUserLoginOn.next(true);
  //       this.currentUserData.next(userData);
  //       console.log(userData);
  //       if (userData.tipo === 'ADMIN') {
  //         this.currentAdmin.next(true);
  //       }
  //     }),
  //     catchError(this.handlerError)
  //   );
  // }

  updateUser(updates: Partial<User>): Observable<User> {
    const userId = this.currentUserData.value._id; // Asumiendo que el modelo User tiene un campo "_id"
  
    // Realizar la solicitud PUT solo con los campos que deseamos actualizar
    const requestBody: Partial<User> = {};
    if (updates.username) {
      requestBody.username = updates.username;
    }
    if (updates.password) {
      requestBody.password = updates.password;
    }
  
    return this.http.put<User>(`${this.url}/user/${userId}`, requestBody).pipe(
      tap((updatedUser: User) => {
        // Actualizar los campos del usuario actual en el BehaviorSubject
        this.currentUserData.next({
          ...this.currentUserData.value,
          ...updatedUser
        });
      }),
      catchError(this.handlerError)
    );
  }
  

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials).pipe(
      tap((userData: User) => {
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData);
        console.log(userData.tipo);
        if (userData.tipo === 'ADMIN') {
          this.currentAdmin.next(true);
        }
      }),
      catchError(this.handlerError)
    )
  }

  logout(): Observable<any> {
    return this.http.post(`${this.url}/logout`, {}).pipe(
      tap(() => {
        this.currentUserLoginOn.next(false);
        this.currentUserData.next({ username: '', email: '', tipo: '' });
        this.currentAdmin.next(false);
      }),
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Se ha producido un error", error.error);
    } else {
      console.error("Backend retorno codigo de estado", error.status, error.error);
    }
    return throwError(() => new Error("Algo fallo, por favor intente nuevamente"));
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }
}
