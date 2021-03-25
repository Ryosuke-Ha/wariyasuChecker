import { Component, OnInit } from '@angular/core';
import { DisplayLists } from 'src/app/model/display-lists.model';

@Component({
  selector: 'app-stock-lists',
  templateUrl: './stock-lists.component.html',
  styleUrls: ['./stock-lists.component.scss']
})
export class StockListsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['ticker', 'company', 'PER', 'PSR', 'PBR', 'yield'];
  dataSource = ELEMENT_DATA;

}

const ELEMENT_DATA: DisplayLists[] = [
  {ticker: 'AA', company: 'Hydrogen', sector: 'aa', PER: 1.0079, PSR: 1.0079, PBR: 1.0079, yield: 1.0079 },
  {ticker: 'AA', company: 'Helium', sector: 'aa',  PER: 1.0079, PSR: 1.0079, PBR: 1.0079, yield: 1.0079 },
  {ticker: 'AA', company: 'Lithium', sector: 'aa',  PER: 1.0079, PSR: 1.0079, PBR: 1.0079, yield: 1.0079 },
  {ticker: 'AA', company: 'Beryllium', sector: 'aa',  PER: 1.0079, PSR: 1.0079, PBR: 1.0079, yield: 1.0079 },
  {ticker: 'AA', company: 'Boron', sector: 'aa',  PER: 1.0079, PSR: 1.0079, PBR: 1.0079, yield: 1.0079 },
];
