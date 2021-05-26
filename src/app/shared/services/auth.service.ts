import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Admin } from '../../admin';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentAdmin = {};
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,
              public router: Router) { }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signin', {
  //     username,
  //     password
  //   }, httpOptions);
  // }

  //login 
  signIn(admin : object) {
    return this.http.post<any>(`http://localhost:8080/api/auth/signin`, admin)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.router.navigateByUrl('/dashboard/app-dashboard').then();
        // this.getDashboard(res.username).subscribe((res) => {
        //   this.currentAdmin = res;
        // this.router.navigateByUrl('/dashboard/app-dashboard').then();
        // })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/auth/login/']);
    }
  }

  // User profile
  // getDashboard(username): Observable<any> {
  //   let api = `/#/dashboard/app-dashboard/`;
  //   return this.http.get(api, { headers: this.headers }).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.handleError)
  //   )
  // }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }

  createAdmin(admin: object): Observable<object> {  
    return this.http.post('http://localhost:8080/api/auth/signup', admin);  
  } 
}