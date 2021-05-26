import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from '../../shared/services/dialog.service';
import {ErrorService} from '../error-service/error.service';
import {LoggingService} from '../logging-service/logging-service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler{
// Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const dialogService = this.injector.get(DialogService);
    const spinnerService = this.injector.get(NgxSpinnerService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      dialogService.openErrorDialog(message);
      spinnerService.hide().then();
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      dialogService.openErrorDialog(message);
      spinnerService.hide().then();
    }

    // Always log errors
    logger.logError(message, stackTrace);

    console.error(error);
  }
}
