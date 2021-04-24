import { Component, OnInit } from '@angular/core';

import { DisplayLists } from 'src/app/model/display-lists.model';

import { GetPerListService } from 'src/app/service/get-per-list/get-per-list.service';

@Component({
  selector: 'app-stock-lists',
  templateUrl: './stock-lists.component.html',
  styleUrls: ['./stock-lists.component.scss']
})
export class StockListsComponent implements OnInit {

  constructor(
    private getPerListService: GetPerListService
  ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['ticker', 'company', 'PER', 'PSR', 'PBR', 'yield'];
  dataSource = ELEMENT_DATA;

}

const ELEMENT_DATA: DisplayLists[] = [
  {Ticker: 'AA', Company: 'Hydrogen', Sector: 'aa', PER: 1.0079, perFlug: true,  PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Helium', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Lithium', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
  {Ticker: 'AA', Company: 'Boron', Sector: 'aa',  PER: 1.0079, perFlug: false, PSR: 1.0079, PBR: 1.0079, Yield: 1.0079 },
];
