import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LatestValue } from '../../models/display.model';
import { Sector } from '../../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class LatestValueService {

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
  ) { }


  private requestAlphavantage(ticker: string){
    let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${environment.alphavantage.apiKey}`;

    return this.http.get(api);
  }

  getCollection(): Observable<LatestValue[]>{
    return this.afStore.collection<LatestValue>('latestValue').valueChanges();
  }

  createCollection(data: LatestValue[]){
    data.forEach(item => {
      return new Promise<any>((resolve, reject) =>{
        this.afStore.collection("latestValue")
        .add(item)
        .then(res => {
          console.log('created collection');
        }, err => reject(err))
      });
    } );
  }
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
