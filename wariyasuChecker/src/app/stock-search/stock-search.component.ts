import { Component, OnInit } from '@angular/core';
import { CaluculateService } from './shared/caluculate.service';

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
    private caluculateService: CaluculateService
  ) { }

  ngOnInit(): void {
    this.caluculateService.caluculateForDisplay().then(res => {
      this.initialList = res;
    });
  }

  searchStocks(){
    this.panelOpenState = false;
    this.displayList = this.caluculateService.margeWithAveList(this.initialList);
    console.log(this.displayList);
  }

  clearSearch(){
    this.panelOpenState = true;
  }
}



