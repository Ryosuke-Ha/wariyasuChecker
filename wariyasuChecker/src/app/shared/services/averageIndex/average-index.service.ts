import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AverageIndex } from '../../models/display.model';

@Injectable({
  providedIn: 'root'
})
export class AverageIndexService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getCollection(): Observable<AverageIndex[]>{
    return this.afStore.collection<AverageIndex>('averageIndex').valueChanges();
  }
}
