import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LatestStock } from 'src/app/model/latestStock.model';
import { environment } from 'src/environments/environment';
import { UsCompanyService } from '../us-company/us-company.service';

@Injectable({
  providedIn: 'root'
})
export class LatestStockService {

  constructor(
    private http: HttpClient,
    private usCompanyService: UsCompanyService,
    private afStore: AngularFirestore
  ) { }

  temporarySleep(delay) {
    let endTime = new Date().getTime()+parseInt(delay);
    while (new Date().getTime() < endTime );
}


// getLatestStockList(){
//     let cnt = 0;
//     let lists: LatestStock[] = new Array();

//     let results: string;

//     this.usCompanyService.getUsCompanyAll()

//     this.usCompanyService.getUsCompanyAll().subscribe(companylist => {
//       companylist.forEach(company => {
//         if((cnt % 5) == 0 && cnt != 0){
//           this.temporarySleep('60000');
//         }

//         this.requestAlphavantage(company.ticker).subscribe(res => {
//           results = res['Meta Data'];
//         });

//         console.log(results);

//         this.requestAlphavantage(company.ticker).subscribe(res => {
//           console.log('ok');
//             let latestDate = res['Meta Data']['3. Last Refreshed'];
//             console.log(latestDate);
//           // if(res){
//           //   console.log('ok');
//           //   let latestDate = res['Meta Data']['3. Last Refreshed'];

//           //   lists.push({
//           //     companyId: company.companyId,
//           //     companyName: company.companyName,
//           //     ticker: company.ticker,
//           //     lastRefreshed: latestDate,
//           //     open: res['Time Series (Daily)'][latestDate]['1. open'],
//           //     high: res['Time Series (Daily)'][latestDate]['2. high'],
//           //     low: res['Time Series (Daily)'][latestDate]['3. low'],
//           //     close: res['Time Series (Daily)'][latestDate]['4. close'],
//           //     adjusted: res['Time Series (Daily)'][latestDate]['5. adjusted close']
//           //   });
//           // }else{
//           //   console.log(company.ticker + 'is not existed');
//           // }

//           // console.log(res['Meta Data']['3. Last Refreshed']);
//           // // console.log(res['Time Series (Daily)'][latestDate]['1. open']);
//           // // console.log(res['Time Series (Daily)'][latestDate]['2. high']);
//           // // console.log();
//           // // console.log();
//           // // console.log();
//           // console.log('-----------------------------')

//         });
//         cnt = cnt + 1;

//         console.log(company.ticker);
//         console.log(lists);
//       });
//       console.log(lists);
//     });

//     //delete if collection is existed
//     //this.deleteCollection();

//     //create collection
//     this.createCollection(lists);
//   }

  private requestAlphavantage(ticker: string){
    let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${environment.alphavantage.apiKey}`;

    //let test = this.http.get(api);

    //let test2 = test['Meta Data']['3. Last Refreshed'];

    return this.http.get(api);
  }

  deleteCollection(){
    this.afStore.collection("latestStock").doc().delete().then(() =>{
      console.log('deleted collection');
    });
  }

  createCollection(data: LatestStock[]){
    data.forEach(item => {
      return new Promise<any>((resolve, reject) =>{
        this.afStore.collection("latestStock")
        .add(item)
        .then(res => {
          console.log('created collection');
        }, err => reject(err))
      });
    } );
  }
}
