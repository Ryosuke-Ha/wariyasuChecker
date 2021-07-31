import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Index } from '../../models/display.model';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(
    private afStore: AngularFirestore
  ) { }

  getCollection(): Observable<Index[]>{
    return this.afStore.collection<Index>('index').valueChanges();
  }
}