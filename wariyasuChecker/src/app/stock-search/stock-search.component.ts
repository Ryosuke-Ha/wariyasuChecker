import { Component, OnInit } from '@angular/core';
import { CaluculateService } from './shared/caluculate.service';
import { LatestStockService } from './shared/latest-stock.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  panelOpenState = true;

  initialList: any;
  displayList: any;

  constructor(
    private caluculateService: CaluculateService,
    private latestStockService: LatestStockService
  ) { }

  ngOnInit(): void {
    this.caluculateService.caluculateForDisplay().then(res => {
      this.initialList = res;
    });
  }

  searchStocks(){
    this.panelOpenState = false;
    this.displayList = this.caluculateService.margeWithAveList(this.initialList);
  }

  clearSearch(){
    this.panelOpenState = true;
  }

  clickTest(){
    this.latestStockService.getLatestStockList();
  }
}



