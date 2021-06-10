import { Component, OnInit } from '@angular/core';
import { UsCompanyService } from '../shared/services/us-company/us-company.service';
import { LatestStockService } from './shared/latest-stock.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  panelOpenState = true;

  constructor(
    private latestStockService: LatestStockService,
    private usCompanyService: UsCompanyService
  ) { }

  ngOnInit(): void {

  }

  searchStocks(){
    this.panelOpenState = false;
    this.latestStockService.updateLatestStock();
  }

  clearSearch(){
    this.panelOpenState = true;
  }
}
