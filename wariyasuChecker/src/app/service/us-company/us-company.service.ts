import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Sector, SectorWithCompanyList } from 'src/app/model/sector.model';
import { UsCompany } from 'src/app/model/us-company.model';

@Injectable({
  providedIn: 'root'
})
export class UsCompanyService implements OnInit {

  private usCompanyCollection: AngularFirestoreCollection<UsCompany>;

  private sectorCollection: AngularFirestoreCollection<Sector>;

  resultList: SectorWithCompanyList[] = [];

  constructor(
    private afStore: AngularFirestore
  ) { }

  ngOnInit(){
  }

  getUsCompanyAll(){
    this.usCompanyCollection = this.afStore.collection<UsCompany>('usCompany');
    return this.usCompanyCollection.valueChanges();
  }

  getSectorAll(){
    this.sectorCollection = this.afStore.collection<Sector>('sector');
    return this.sectorCollection.valueChanges();
  }

  getUsCompanyWithSectorName(){
    this.getSectorAll().subscribe(res => {
      res.forEach(sect => {
        this.getUsCompanyAll().subscribe(resUs => {
          let usList: UsCompany[] = [];
          resUs.forEach(usCom => {
            if(sect.sectorId === usCom.sectorId){
              usList.push(usCom);
            }
          });
          this.resultList.push({
            sectorName: sect.sectorName,
            companyList: usList
          });
        });
      });
    });

    return this.resultList;


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
