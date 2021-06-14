import { Component, OnInit } from '@angular/core';
import { UsCompanyService } from '../shared/services/us-company/us-company.service';
import { CaluculateService } from './shared/caluculate.service';
import { Index } from './shared/index.model';
import { LatestStockService } from './shared/latest-stock.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  panelOpenState = true;

  displayList: any;

  constructor(
    private latestStockService: LatestStockService,
    private usCompanyService: UsCompanyService,
    private caluculateService: CaluculateService
  ) { }

  ngOnInit(): void {

  }

  searchStocks(){
    this.panelOpenState = false;
    //this.latestStockService.updateLatestStock();
    this.displayList = this.caluculateService.caluculateForDisplay();
    console.log(this.displayList);
  }

  clearSearch(){
    this.panelOpenState = true;
  }
}



