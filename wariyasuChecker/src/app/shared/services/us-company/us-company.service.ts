import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsCompany } from 'src/app/model/us-company.model';
import { Index } from 'src/app/stock-search/shared/index.model';
import { SectorService } from '../../../service/sector/sector.service';
import { Sector, SectorWithCompanyList } from '../../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class UsCompanyService {

  private usCompanyCollection: AngularFirestoreCollection<UsCompany>;

  resultList: SectorWithCompanyList[] = [];
  usList: UsCompany[] = [];
  sectorList: Sector[] = [
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

  constructor(
    private afStore: AngularFirestore,
    private sectorService: SectorService
  ) {
   }

   getUsCompanyLists(){
     return this.getUsCompanyAllApi().pipe(
       map(res => { return res; }
        ,catchError(err => of(err)))
     ).subscribe(res => {
       return res;
     },
     err => { throw err; })
   }

   private getUsCompanyAllApi(): Observable<UsCompany[]>{
    return this.afStore.collection<UsCompany>('usCompany').valueChanges();
  }

  //firestore登録用(使用後削除)
  createCollection(data: Index[]){
    data.forEach(item => {
      return new Promise<any>((resolve, reject) =>{
        this.afStore.collection("index")
        .add(item)
        .then(res => {}, err => reject(err))
      });
    } );
  }
}


