import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sector } from 'src/app/model/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private sectorCollection: AngularFirestoreCollection<Sector>;

  constructor(
    private afStore: AngularFirestore
  ) { }

  getSectorAll(): Observable<Sector[]>{
    return this.afStore.collection<Sector>('sector').valueChanges().pipe(map(res => {return res;}));
  }
}
