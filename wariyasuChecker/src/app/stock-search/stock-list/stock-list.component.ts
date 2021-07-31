import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Input() displayList;

  displayedColumns: string[] = ['ticker', 'company', 'PER', 'PSR', 'PBR', 'Yeild'];

  // link
  link = 'http://ryo-portfolio.com/%e3%80%90%e5%89%b2%e5%ae%89%e3%83%81%e3%82%a7%e3%83%83%e3%82%ab%e3%83%bc%e3%80%91%e8%a8%88%e7%ae%97%e5%9f%ba%e6%ba%96/';

  constructor() { }

  ngOnInit() {
    
  }

  changeDisplayItem(low: number, high: number, temp: number) {
    let displayItem = '';

    if (temp < 0) {
      displayItem = '-';
    } else {
      if (low > temp) {
        displayItem = '〇';
      } else if (low < temp && high > temp) {
        displayItem = '△';
      } else if (high < temp) {
        displayItem = '×';
      } else {
        displayItem = '-';
      }
    }
    return displayItem;
  }

  changeDisplayItemYeild(low: number, high: number, temp: number) {
    let displayItem = '';

    if (temp < 0) {
      displayItem = '-';
    } else {
      if (low < temp*100) {
        displayItem = '〇';
      } else if (low > temp*100 && high < temp*100) {
        displayItem = '△';
      } else if (high > temp*100) {
        displayItem = '×';
      } else {
        displayItem = '-';
      }
    }
    return displayItem;
  }
}

