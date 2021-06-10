import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorContent, Message } from '../models/error-message';
declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new Subject<Message>();

  changeDisplayMode: Observable<Message> = this.message.asObservable();

  constructor() { }

  showError(content: any){
    this.message.next({
      type: 'error',
      content: {
        status: content.status,
        name: content.name,
        message: content.message
      }
    });
  }

  sendErrorInfo(sessionId: string, errorMsg: ErrorContent){
    Email.send({
      SecureToken : environment.smtpjs.token,
      To : environment.smtpjs.email,
      From : environment.smtpjs.email,
      Subject : `識別番号 ： ${sessionId}`,
      Body : `【システムエラー発生】<br>
      ${errorMsg.status} : ${errorMsg.name}<br>
      message :<br>
      ${errorMsg.message}<br>
      発生日時 : ${new Date()}`
  });
  }
}


