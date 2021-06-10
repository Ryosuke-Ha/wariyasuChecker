import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @Input()
  errorMsg: any;

  sessionId: string;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.sessionId = Math.random().toString(36).substr(2, 9);

    // comment out before release
    //this.messageService.sendErrorInfo(this.sessionId, this.errorMsg);
  }

}
