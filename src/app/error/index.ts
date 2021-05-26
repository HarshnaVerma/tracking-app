import {ErrorHandler, Provider} from '@angular/core';
import {GlobalErrorHandlerService} from './global-error-handler/global-error-handler.service';
import {ErrorService} from './error-service/error.service';
import {LoggingService} from './logging-service/logging-service';

const errorHandlers: Provider[] = [{
  provide: ErrorHandler,
  useClass: GlobalErrorHandlerService
},
  ErrorService,
  LoggingService
];

export const GlobalErrorHandlers = errorHandlers;
