import { Component, OnInit } from '@angular/core';
import { Sector } from 'src/app/model/sector.model';
import { UsCompany } from 'src/app/model/us-company.model';
import { UsCompanyService } from 'src/app/service/us-company/us-company.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {
  panelOpenState = true;

  usCompany$;

  usCompanies: UsCompany[];



  constructor(
    private usCompanyService: UsCompanyService,
  ) { }

  ngOnInit(): void {

  }

  searchStocks(){
    this.panelOpenState = false;



    // let data:Sector[] =[
    //   {sectorId: '01',sectorName: '素材'},
    //   {sectorId: '02',sectorName: '金融'},
    //   {sectorId: '03',sectorName: '資本財'},
    //   {sectorId: '04',sectorName: '情報技術'},
    //   {sectorId: '05',sectorName: '生活必需品'},
    //   {sectorId: '06',sectorName: 'ヘルスケア'},
    //   {sectorId: '07',sectorName: '一般消費財'},
    //   {sectorId: '08',sectorName: 'エネルギー'},
    //   {sectorId: '09',sectorName: 'コミュニケーションサービス'},
    // ]


    // this.usCompanyService.createCollection(data);
  }

  clearSearch(){
    this.panelOpenState = true;
  }

}
