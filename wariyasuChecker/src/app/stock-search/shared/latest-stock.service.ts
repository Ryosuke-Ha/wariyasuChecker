import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LatestStock } from 'src/app/model/latestStock.model';
import { UsCompany } from 'src/app/model/us-company.model';
import { Sector } from 'src/app/shared/models/sector.model';
import { UsCompanyService } from 'src/app/shared/services/us-company/us-company.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatestStockService implements OnInit {

  usCompanies: any;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private usCompanyService: UsCompanyService
  ) { }

  ngOnInit(){
  }




// private requestAlphavantage(ticker: string){
//   let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${environment.alphavantage.apiKey}`;

//   return this.http.get(api);
// }


  // deleteCollection(){
  //   this.afStore.collection("latestStock").doc().delete().then(() =>{
  //     console.log('deleted collection');
  //   });
  // }

  // createCollection(data: LatestStock[]){
  //   data.forEach(item => {
  //     return new Promise<any>((resolve, reject) =>{
  //       this.afStore.collection("latestStock")
  //       .add(item)
  //       .then(res => {
  //         console.log('created collection');
  //       }, err => reject(err))
  //     });
  //   } );
  // }
}

const SECTOR_LISTS: Sector[] = [
  { sectorId: "05", sectorName: "生活必需品"},
  { sectorId: "00", sectorName: "公益"},
  { sectorId: "01", sectorName: "素材"},
  { sectorId: "07", sectorName: "一般消費財"},
  { sectorId: "06", sectorName: "ヘルスケア"},
  { sectorId: "09", sectorName: "コミュニケーションサービス"},
  { sectorId: "08", sectorName: "エネルギー"},
  { sectorId: "02", sectorName: "金融"},
  { sectorId: "03", sectorName: "資本財"},
  { sectorId: "04", sectorName: "情報技術"}
];
