import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from './message.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler{

  constructor(
    private messageService: MessageService,
    private zone: NgZone
  ) { }

  public handleError(error: any){
    this.zone.run(() => {
      this.messageService.showError(error);
    });

    console.log(error);
  }
}
