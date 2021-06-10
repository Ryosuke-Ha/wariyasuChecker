import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from './shared/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogin = true;

  errorFlg = '';
  errorMsg: any;

  constructor(
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(){
    //error handling
    this.messageService.changeDisplayMode.subscribe(res => {
      this.errorFlg = res.type;
      this.errorMsg = res.content;

      this.changeDetectorRef.detectChanges();
    });
  }
}
