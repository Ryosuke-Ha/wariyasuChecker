import { Component, OnInit } from '@angular/core';
import { DisplayLists } from 'src/app/stock-search/shared/display-lists.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  displayedColumns: string[] = ['ticker', 'company', 'PER', 'PSR', 'PBR', 'yield'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

// pipeで〇△✕の表記を変更する？
// 計算結果 | 平均値(pipeを作成する)

const ELEMENT_DATA: DisplayLists[] = [
  {Ticker: 'AA', Company: 'Hydrogen', Sector: 'aa', PER: 1.0079, perFlug: true,  PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Helium', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Lithium', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Boron', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
];
