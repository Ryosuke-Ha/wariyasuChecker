import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  panelOpenState = true;

  constructor() { }

  ngOnInit(): void {
  }

  searchStocks(){
    this.panelOpenState = false;
  }

  clearSearch(){
    this.panelOpenState = true;
  }
}
