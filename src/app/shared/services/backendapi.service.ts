import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class BackendApiService {



  // dataSource = new BehaviorSubject<any>({});
  // data = this.dataSource.asObservable();
  // online$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    // this.online$ = merge(
    //   fromEvent(window, 'online').pipe(mapTo(true)),
    //   fromEvent(window, 'offline').pipe(mapTo(false))
    // );
    // this.online$.subscribe((data) => {
    //   if (!data) {
    //   alert('No Internet Connection,check your network');
    //   } else {
    //     alert('Internet Connection is restored');
    //   }
    // });
  }

  postMapping(url, requestBody) {
    return this.httpClient.post<any>(url, requestBody)
      .toPromise()
      .then(data => {
          return data;
        }, error => {
          console.log('API error : ' + JSON.stringify(error));
          return null;
        }
      );
  }

  callGetApi(url) {
    return this.httpClient.get<any>(
      url
    );
  }

  callGetApiWithHeaders(url , httpHeaders) {
    return this.httpClient.get<any>(
      url, {headers: httpHeaders}
    );
  }

}
