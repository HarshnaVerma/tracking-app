import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  constructor(
    private http: HttpClient
  ) {

  }

   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getIpAddress() {
    return this.http
      .get<any>('https://api.ipify.org/?format=json')
      .pipe(
        catchError(this.handleError)
      );
  }

  getGEOLocation(ip) {
// let headers = new HttpHeaders();
    const url = 'https://api.ipgeolocation.io/ipgeo?' +
      'apiKey=c3f7352cfd7345c781414ea3fe2b9118&ip=' + ip;
    return this.http
      .get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }




}
