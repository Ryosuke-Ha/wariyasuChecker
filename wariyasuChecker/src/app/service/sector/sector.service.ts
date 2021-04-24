import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Sector } from 'src/app/model/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private sectorCollection: AngularFirestoreCollection<Sector>;

  constructor(
    private afStore: AngularFirestore
  ) { }

  getSectorAll(){
    this.sectorCollection = this.afStore.collection<Sector>('sector');
    return this.sectorCollection.valueChanges();
  }
}
