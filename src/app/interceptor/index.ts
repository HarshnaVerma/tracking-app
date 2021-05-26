import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpServerInterceptorService} from './http/http-server-interceptor.service';

const interceptors: Provider[] = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpServerInterceptorService,
  multi: true
}];

export const HttpInterceptorProviders = interceptors;
