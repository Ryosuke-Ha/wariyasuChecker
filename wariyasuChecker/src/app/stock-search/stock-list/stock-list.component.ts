import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Input() displayList;

  displayedColumns: string[] = ['ticker', 'company', 'PER', 'PSR', 'PBR', 'Yeild'];

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

