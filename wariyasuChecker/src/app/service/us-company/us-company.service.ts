import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sector, SectorWithCompanyList } from 'src/app/model/sector.model';
import { UsCompany } from 'src/app/model/us-company.model';
import { SectorService } from '../sector/sector.service';

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


  getUsCompanyWithSectorName(): Observable<SectorWithCompanyList[]>{
    let usList: UsCompany[] = [];

    return this.sectorService.getSectorAll().pipe(
      map(res => {
        res.forEach(sect => {
          this.getUsCompanyAll().pipe(
            map(usComList => {
              usComList.forEach(usCom => {
                if(sect.sectorId === usCom.sectorId){
                  usList.push({
                    sectorId: usCom.sectorId,
                    companyId: usCom.companyId,
                    companyName: usCom.companyName,
                    ticker: usCom.sectorId,
                    deleteFlg: usCom.deleteFlg
                  });
                }
              });
              return usList;
            })
          )
          this.resultList.push({
            sectorName: sect.sectorName,
            companyList: usList
          })
        });
        return this.resultList;
      })

    )


    // this.sectorService.getSectorAll().subscribe(res => {
    //   res.forEach(sect => {
    //     this.getUsCompanyAll().subscribe(resUs => {
    //       let usList: UsCompany[] = [];
    //       resUs.forEach(usCom => {
    //         if(sect.sectorId === usCom.sectorId){
    //           usList.push(usCom);
    //         }
    //       });
    //       this.resultList.push({
    //         sectorName: sect.sectorName,
    //         companyList: usList
    //       });
    //     });
    //   });
    // });
  }

  getUsCompanyAll(): Observable<UsCompany[]>{
    return this.afStore.collection<UsCompany>('usCompany').valueChanges();
  }

  //firestore登録用(使用後削除)
  createCollection(data: Sector[]){
    data.forEach(item => {
      return new Promise<any>((resolve, reject) =>{
        this.afStore.collection("sector")
        .add(item)
        .then(res => {}, err => reject(err))
      });
    } );
  }
}


