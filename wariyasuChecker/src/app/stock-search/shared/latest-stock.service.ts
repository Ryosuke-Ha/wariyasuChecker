import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { LatestValue, UsCompany } from 'src/app/shared/models/display.model';
import { Sector } from 'src/app/shared/models/sector.model';
import { UsCompanyService } from 'src/app/shared/services/us-company/us-company.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LatestStockService implements OnInit {

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private usCompanyService: UsCompanyService
  ) { }

   ngOnInit(){
    
  }

  async getLatestStockList(){
    let usCompanyList: Array<UsCompany> = new Array<UsCompany>();
    let itemlist: Array<LatestValue> = new Array<LatestValue>();

    console.log('getLatestStockList start');
    
    usCompanyList = await this.getUsCompanyList();

    for(let i = 0; i < usCompanyList.length; i++){
      if((i + 1) % 5 === 0){
        await this.sleepOneMinute();
        console.log('fired ' + i);
      }

      const latestData = this.requestAlphavantage(usCompanyList[i].ticker, usCompanyList[i].companyId, usCompanyList[i].companyName);

      latestData.then(data => {
        itemlist.push(data);
      });
    }

    console.log(itemlist);

    await this.createCollection(itemlist);

    // await this.deleteAllDocOfLatestValue(LATEST_VALUE).then(res => {
        
    // });

    console.log('done');
  }

  private async getUsCompanyList(): Promise<Array<UsCompany>>{
    return new Promise((resolve, reject) => {
      this.usCompanyService.getCollection().subscribe(res => {
        let usCompanyList: Array<UsCompany> = new Array<UsCompany>();
        usCompanyList = res;
        resolve(usCompanyList);
      },
      err => {
        reject(err);
      })
    });
  }

  private async requestAlphavantage(ticker: string, companyId: string, name: string){
    let api = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${environment.alphavantage.apiKey}`;

    return this.http.get(api).toPromise().then(res => {
      if(!res['Error Message']){
        let latestDate = (res['Meta Data']['3. Last Refreshed']).substr(0, 10);

        const response: LatestValue = {
          companyId: companyId,
          companyName: name,
          lastRefreshed: latestDate,
          ticker: ticker,
          open: Number(res['Time Series (Daily)'][latestDate]['1. open']),
          high: Number(res['Time Series (Daily)'][latestDate]['2. high']),
          low: Number(res['Time Series (Daily)'][latestDate]['3. low']),
          close: Number(res['Time Series (Daily)'][latestDate]['4. close']),
          adjusted: Number(res['Time Series (Daily)'][latestDate]['5. adjusted close'])
        };
        return response;
      }else{
        console.log(`sorry, ticker 【${ticker}】 is not found by this api.`)
      }
      
    })
  } 

  sleepOneMinute(){
    const oneMin = 60000;
    return new Promise(resolve => setTimeout(resolve, oneMin));
  }

  private async deleteAllDocOfLatestValue(data: LatestValue[]){
    try{
      return new Promise((resolve, reject) => {
        this.afStore.collection("latestValue").get().toPromise().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            console.log('delete');
          });

        //   data.forEach(item => {
        //     this.afStore.collection("latestValue").add(item).then(res => {
        //       console.log('added item');
        //     });
        //   });

        },
        err => { reject(err); });
      })
    }
    catch(e){
      throw e;
    }
    finally{
      console.log('latestValue was updated successfully')
    }
  }

  private async createCollection(data: LatestValue[]){
    console.log('adding')
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

const LATEST_VALUE: LatestValue[] = [
  {
      companyId: "02009",
      companyName: "カレン・フロスト・バンカーズ",
      lastRefreshed: "2021-07-09",
      ticker: "CFR",
      open: 107.15,
      high: 108.71,
      low: 106.505,
      close: 108.4,
      adjusted: 108.4
  },
  {
      companyId: "09003",
      companyName: "テレフォン＆データシステムズ",
      lastRefreshed: "2021-07-09",
      ticker: "TDS",
      open: 22.53,
      high: 22.9,
      low: 22.4417,
      close: 22.78,
      adjusted: 22.78
  },
  {
      companyId: "02004",
      companyName: "フランクリン・リソーシズ",
      lastRefreshed: "2021-07-09",
      ticker: "BEN",
      open: 31.87,
      high: 32.15,
      low: 31.61,
      close: 32.15,
      adjusted: 32.15
  },
  {
      companyId: "03012",
      companyName: "ゼネラル・ダイナミクス",
      lastRefreshed: "2021-07-09",
      ticker: "GD",
      open: 190.14,
      high: 191.24,
      low: 188.59,
      close: 190.22,
      adjusted: 190.22
  },
  {
      companyId: "02012",
      companyName: "イリー・インデムニティー",
      lastRefreshed: "2021-07-09",
      ticker: "ERIE",
      open: 188.71,
      high: 188.71,
      low: 186.3539,
      close: 188.22,
      adjusted: 188.22
  },
  {
      companyId: "03023",
      companyName: "ペンテア",
      lastRefreshed: "2021-07-09",
      ticker: "PNR",
      open: 69.45,
      high: 70.15,
      low: 69.07,
      close: 69.3,
      adjusted: 69.3
  },
  {
      companyId: "03002",
      companyName: "AOスミス",
      lastRefreshed: "2021-07-09",
      ticker: "AOS",
      open: 71.62,
      high: 71.62,
      low: 70.59,
      close: 70.75,
      adjusted: 70.75
  },
  {
      companyId: "00014",
      companyName: "エッセンシャル・ユーティリティーズ",
      lastRefreshed: "2021-07-09",
      ticker: "WTRG",
      open: 47.78,
      high: 47.98,
      low: 47.44,
      close: 47.94,
      adjusted: 47.94
  },
  {
      companyId: "02013",
      companyName: "マーキュリー・ジェネラル",
      lastRefreshed: "2021-07-09",
      ticker: "MCY",
      open: 63,
      high: 63.16,
      low: 62.38,
      close: 63.07,
      adjusted: 63.07
  },
  {
      companyId: "06007",
      companyName: "ストライカー",
      lastRefreshed: "2021-07-09",
      ticker: "SYK",
      open: 265.01,
      high: 265.27,
      low: 263.61,
      close: 264.43,
      adjusted: 264.43
  },
  {
      companyId: "02015",
      companyName: "ピープルズ・ユナイテッド・ファイナンシャル",
      lastRefreshed: "2021-07-09",
      ticker: "PBCT",
      open: 16.5,
      high: 16.72,
      low: 16.36,
      close: 16.7,
      adjusted: 16.7
  },
  {
      companyId: "07005",
      companyName: "ポラリス・インダストリーズ",
      lastRefreshed: "2021-07-09",
      ticker: "PII",
      open: 134.66,
      high: 136.31,
      low: 134.28,
      close: 136.15,
      adjusted: 136.15
  },
  {
      companyId: "03015",
      companyName: "イリノイ・ツール・ワークス",
      lastRefreshed: "2021-07-09",
      ticker: "ITW",
      open: 226.81,
      high: 228.2,
      low: 226.59,
      close: 227.38,
      adjusted: 227.38
  },
  {
      companyId: "04002",
      companyName: "バジャー・メーター",
      lastRefreshed: "2021-07-09",
      ticker: "BMI",
      open: 99.69,
      high: 100.66,
      low: 99.12,
      close: 100.09,
      adjusted: 100.09
  },
  {
      companyId: "00001",
      companyName: "アルテシアン・リソーシズ",
      lastRefreshed: "2021-07-09",
      ticker: "ARTNA",
      open: 37.54,
      high: 37.95,
      low: 37.02,
      close: 37.27,
      adjusted: 37.27
  },
  {
      companyId: "05014",
      companyName: "シスコ",
      lastRefreshed: "2021-07-09",
      ticker: "SYY",
      open: 75.28,
      high: 76.52,
      low: 74.83,
      close: 76.14,
      adjusted: 76.14
  },
  {
      companyId: "08001",
      companyName: "シェブロン",
      lastRefreshed: "2021-07-09",
      ticker: "CVX",
      open: 103.46,
      high: 104.23,
      low: 102.36,
      close: 104.07,
      adjusted: 104.07
  },
  {
      companyId: "05008",
      companyName: "ランカスターコロニー",
      lastRefreshed: "2021-07-09",
      ticker: "LANC",
      open: 195.33,
      high: 196.19,
      low: 193.99,
      close: 196.04,
      adjusted: 196.04
  },
  {
      companyId: "01003",
      companyName: "アプターグループ",
      lastRefreshed: "2021-07-09",
      ticker: "ATR",
      open: 139.85,
      high: 141.28,
      low: 139.76,
      close: 141.18,
      adjusted: 141.18
  },
  {
      companyId: "03006",
      companyName: "シンタス",
      lastRefreshed: "2021-07-09",
      ticker: "CTAS",
      open: 389.66,
      high: 389.66,
      low: 383.785,
      close: 388.32,
      adjusted: 388.32
  },
  {
      companyId: "00010",
      companyName: "ナショナル・ヒューエル・ガス",
      lastRefreshed: "2021-07-09",
      ticker: "NFG",
      open: 52.54,
      high: 52.64,
      low: 51.78,
      close: 52.17,
      adjusted: 52.17
  },
  {
      companyId: "06002",
      companyName: "アボット・ラボラトリーズ",
      lastRefreshed: "2021-07-09",
      ticker: "ABT",
      open: 119.65,
      high: 120.24,
      low: 119.24,
      close: 119.74,
      adjusted: 119.74
  },
  {
      companyId: "01011",
      companyName: "ソノコ・プロダクツ",
      lastRefreshed: "2021-07-09",
      ticker: "SON",
      open: 67.73,
      high: 67.82,
      low: 66.985,
      close: 67.3,
      adjusted: 67.3
  },
  {
      companyId: "06008",
      companyName: "ウエスト・ファーマシューティカル・サービシズ",
      lastRefreshed: "2021-07-09",
      ticker: "WST",
      open: 374.47,
      high: 375.19,
      low: 371.55,
      close: 374.19,
      adjusted: 374.19
  },
  {
      companyId: "02014",
      companyName: "オールド・リパブリック・インターナショナル",
      lastRefreshed: "2021-07-09",
      ticker: "ORI",
      open: 24.67,
      high: 25.035,
      low: 24.64,
      close: 25.02,
      adjusted: 25.02
  },
  {
      companyId: "00013",
      companyName: "UGI",
      lastRefreshed: "2021-07-09",
      ticker: "UGI",
      open: 46.2,
      high: 46.58,
      low: 46,
      close: 46.54,
      adjusted: 46.54
  },
  {
      companyId: "02026",
      companyName: "UMBファナンシャル",
      lastRefreshed: "2021-07-09",
      ticker: "UMBF",
      open: 89.62,
      high: 91.39,
      low: 88.895,
      close: 91.22,
      adjusted: 91.22
  },
  {
      companyId: "06004",
      companyName: "カーディナルヘルス",
      lastRefreshed: "2021-07-09",
      ticker: "CAH",
      open: 57.13,
      high: 57.49,
      low: 56.94,
      close: 57.18,
      adjusted: 57.18
  },
  {
      companyId: "09002",
      companyName: "AT&T",
      lastRefreshed: "2021-07-09",
      ticker: "T",
      open: 28.25,
      high: 28.5375,
      low: 28.24,
      close: 28.45,
      adjusted: 28.45
  },
  {
      companyId: "03005",
      companyName: "カーライル",
      lastRefreshed: "2021-07-09",
      ticker: "CSL",
      open: 193.98,
      high: 195.76,
      low: 193.105,
      close: 194.12,
      adjusted: 194.12
  },
  {
      companyId: "00004",
      companyName: "ブラック・ヒルズ",
      lastRefreshed: "2021-07-09",
      ticker: "BKH",
      open: 65.96,
      high: 66.75,
      low: 65.8,
      close: 66.66,
      adjusted: 66.66
  },
  {
      companyId: "02010",
      companyName: "シンシナティ・ファイナンシャル",
      lastRefreshed: "2021-07-09",
      ticker: "CINF",
      open: 116.26,
      high: 118.99,
      low: 115.4857,
      close: 118.87,
      adjusted: 118.87
  },
  {
      companyId: "05006",
      companyName: "キンバリー･クラーク",
      lastRefreshed: "2021-07-09",
      ticker: "KMB",
      open: 135.54,
      high: 135.92,
      low: 135,
      close: 135.02,
      adjusted: 135.02
  },
  {
      companyId: "05009",
      companyName: "マコーミック",
      lastRefreshed: "2021-07-09",
      ticker: "MKC",
      open: 87.16,
      high: 87.2687,
      low: 86.37,
      close: 87.1,
      adjusted: 87.1
  },
  {
      companyId: "04001",
      companyName: "ADP",
      lastRefreshed: "2021-07-09",
      ticker: "ADP",
      open: 202,
      high: 203.97,
      low: 201.8313,
      close: 203.72,
      adjusted: 203.72
  },
  {
      companyId: "00011",
      companyName: "ノースウェスト・ナチュラル・ガス",
      lastRefreshed: "2021-07-09",
      ticker: "NWN",
      open: 51.74,
      high: 52.09,
      low: 51.27,
      close: 52,
      adjusted: 52
  },
  {
      companyId: "02003",
      companyName: "バンクファースト",
      lastRefreshed: "2021-07-09",
      ticker: "BANF",
      open: 59.43,
      high: 60.85,
      low: 59.28,
      close: 60.82,
      adjusted: 60.82
  },
  {
      companyId: "03003",
      companyName: "ブレイディ",
      lastRefreshed: "2021-07-09",
      ticker: "BRC",
      open: 54.35,
      high: 55.21,
      low: 54.0152,
      close: 54.44,
      adjusted: 54.44
  },
  {
      companyId: "00003",
      companyName: "アメリカン・ステイツ・ウォーター",
      lastRefreshed: "2021-07-09",
      ticker: "AWR",
      open: 82.48,
      high: 82.9,
      low: 81.75,
      close: 82.51,
      adjusted: 82.51
  },
  {
      companyId: "03020",
      companyName: "MSAセーフティ",
      lastRefreshed: "2021-07-09",
      ticker: "MSA",
      open: 165.13,
      high: 165.42,
      low: 163.04,
      close: 164.96,
      adjusted: 164.96
  },
  {
      companyId: "02008",
      companyName: "コミュニティ・バンク・システム",
      lastRefreshed: "2021-07-09",
      ticker: "CBU",
      open: 73.17,
      high: 74.18,
      low: 72.875,
      close: 74.06,
      adjusted: 74.06
  },
  {
      companyId: "00006",
      companyName: "コンソンデーテッド・エンジン",
      lastRefreshed: "2021-07-09",
      ticker: "ED",
      open: 73.6,
      high: 73.8293,
      low: 72.77,
      close: 73.3,
      adjusted: 73.3
  },
  {
      companyId: "07003",
      companyName: "ロウズ",
      lastRefreshed: "2021-07-09",
      ticker: "LOW",
      open: 194.18,
      high: 196.75,
      low: 194.18,
      close: 195.33,
      adjusted: 195.33
  },
  {
      companyId: "04003",
      companyName: "IBM",
      lastRefreshed: "2021-07-09",
      ticker: "IBM",
      open: 141.45,
      high: 141.98,
      low: 140.841,
      close: 141.52,
      adjusted: 141.52
  },
  {
      companyId: "05010",
      companyName: "アルトリアグループ",
      lastRefreshed: "2021-07-09",
      ticker: "MO",
      open: 47.25,
      high: 47.91,
      low: 47,
      close: 47.4,
      adjusted: 47.4
  },
  {
      companyId: "01006",
      companyName: "ニューコア",
      lastRefreshed: "2021-07-09",
      ticker: "NUE",
      open: 95.71,
      high: 97.52,
      low: 94.95,
      close: 97.17,
      adjusted: 97.17
  },
  {
      companyId: "03007",
      companyName: "ドナルドソン",
      lastRefreshed: "2021-07-09",
      ticker: "DCI",
      open: 64.99,
      high: 65.5792,
      low: 64.68,
      close: 65.22,
      adjusted: 65.22
  },
  {
      companyId: "02016",
      companyName: "LI",
      lastRefreshed: "2021-07-09",
      ticker: "LI",
      open: 32.5,
      high: 32.6,
      low: 30.8,
      close: 31.82,
      adjusted: 31.82
  },
  {
      companyId: "02022",
      companyName: "トンプキンス・ファイナンシャル・コーポレーション",
      lastRefreshed: "2021-07-09",
      ticker: "TMP",
      open: 75.4,
      high: 77.8501,
      low: 75.4,
      close: 77.4,
      adjusted: 77.4
  },
  {
      companyId: "07006",
      companyName: "ターゲット",
      lastRefreshed: "2021-07-09",
      ticker: "TGT",
      open: 248.68,
      high: 250.75,
      low: 247.38,
      close: 248.58,
      adjusted: 248.58
  },
  {
      companyId: "08002",
      companyName: "エクソンモービル",
      lastRefreshed: "2021-07-09",
      ticker: "XOM",
      open: 60.695,
      high: 61.45,
      low: 60.2375,
      close: 61.23,
      adjusted: 61.23
  },
  {
      companyId: "06005",
      companyName: "ジョンソン&ジョンソン",
      lastRefreshed: "2021-07-09",
      ticker: "JNJ",
      open: 169.37,
      high: 170.37,
      low: 169.24,
      close: 169.75,
      adjusted: 169.75
  },
  {
      companyId: "03016",
      companyName: "リンカーン・エレクトリック・ホールディングス",
      lastRefreshed: "2021-07-09",
      ticker: "LECO",
      open: 134.11,
      high: 135.3972,
      low: 133.94,
      close: 134.7,
      adjusted: 134.7
  },
  {
      companyId: "05015",
      companyName: "トーツィー・ロール・インダストリーズ",
      lastRefreshed: "2021-07-09",
      ticker: "TR",
      open: 33.64,
      high: 33.76,
      low: 33.36,
      close: 33.53,
      adjusted: 33.53
  },
  {
      companyId: "01007",
      companyName: "PPGインダストリーズ",
      lastRefreshed: "2021-07-09",
      ticker: "PPG",
      open: 170.95,
      high: 172.31,
      low: 169.91,
      close: 171.41,
      adjusted: 171.41
  },
  {
      companyId: "03017",
      companyName: "マシューズ・インターナショナル",
      lastRefreshed: "2021-07-09",
      ticker: "MATW",
      open: 34.04,
      high: 34.98,
      low: 34.04,
      close: 34.61,
      adjusted: 34.61
  },
  {
      companyId: "01001",
      companyName: "アルベマール",
      lastRefreshed: "2021-07-09",
      ticker: "ALB",
      open: 170.5,
      high: 176.32,
      low: 169.5,
      close: 175.51,
      adjusted: 175.51
  },
  {
      companyId: "03025",
      companyName: "スタンレー・ブラック・アンド・デッカー",
      lastRefreshed: "2021-07-09",
      ticker: "SWK",
      open: 207.85,
      high: 209.9,
      low: 206.93,
      close: 208.53,
      adjusted: 208.53
  },
  {
      companyId: "00012",
      companyName: "SJW",
      lastRefreshed: "2021-07-09",
      ticker: "SJW",
      open: 64.77,
      high: 65.27,
      low: 64.13,
      close: 64.87,
      adjusted: 64.87
  },
  {
      companyId: "03009",
      companyName: "エマソン・エレクトリック",
      lastRefreshed: "2021-07-09",
      ticker: "EMR",
      open: 97.41,
      high: 98.14,
      low: 97.21,
      close: 97.61,
      adjusted: 97.61
  },
  {
      companyId: "05005",
      companyName: "ホーメルフーズ",
      lastRefreshed: "2021-07-09",
      ticker: "HRL",
      open: 47.63,
      high: 47.728,
      low: 47.25,
      close: 47.44,
      adjusted: 47.44
  },
  {
      companyId: "03013",
      companyName: "ゴーマン･ラップ",
      lastRefreshed: "2021-07-09",
      ticker: "GRC",
      open: 34.87,
      high: 35.11,
      low: 34.87,
      close: 35.04,
      adjusted: 35.04
  },
  {
      companyId: "02006",
      companyName: "チャブ",
      lastRefreshed: "2021-07-09",
      ticker: "CB",
      open: 160.85,
      high: 162.9,
      low: 159.49,
      close: 162.73,
      adjusted: 162.73
  },
  {
      companyId: "05007",
      companyName: "コカ・コーラ",
      lastRefreshed: "2021-07-09",
      ticker: "KO",
      open: 54.25,
      high: 54.52,
      low: 54.18,
      close: 54.46,
      adjusted: 54.46
  },
  {
      companyId: "03026",
      companyName: "テナント",
      lastRefreshed: "2021-07-09",
      ticker: "TNC",
      open: 77.37,
      high: 77.5,
      low: 76.57,
      close: 76.72,
      adjusted: 76.72
  },
  {
      companyId: "02002",
      companyName: "アロー・ファイナンシャル",
      lastRefreshed: "2021-07-09",
      ticker: "AROW",
      open: 35.93,
      high: 36.1799,
      low: 35.54,
      close: 36.05,
      adjusted: 36.05
  },
  {
      companyId: "03019",
      companyName: "スリーエム",
      lastRefreshed: "2021-07-09",
      ticker: "MMM",
      open: 199.7,
      high: 201.9,
      low: 199.25,
      close: 201,
      adjusted: 201
  },
  {
      companyId: "05011",
      companyName: "ペプシコ",
      lastRefreshed: "2021-07-09",
      ticker: "PEP",
      open: 149.41,
      high: 150.31,
      low: 149.17,
      close: 149.48,
      adjusted: 149.48
  },
  {
      companyId: "03021",
      companyName: "ノードソン",
      lastRefreshed: "2021-07-09",
      ticker: "NDSN",
      open: 218.35,
      high: 221.49,
      low: 217.38,
      close: 221.3,
      adjusted: 221.3
  },
  {
      companyId: "03024",
      companyName: "ローパー・テクノロジーズ",
      lastRefreshed: "2021-07-09",
      ticker: "ROP",
      open: 477.24,
      high: 481.38,
      low: 476.15,
      close: 481.18,
      adjusted: 481.18
  },
  {
      companyId: "03011",
      companyName: "フランクリン・エレクトリック",
      lastRefreshed: "2021-07-09",
      ticker: "FELE",
      open: 80.37,
      high: 81.3318,
      low: 80.13,
      close: 81.16,
      adjusted: 81.16
  },
  {
      companyId: "02018",
      companyName: "SEIインベストメンツ",
      lastRefreshed: "2021-07-09",
      ticker: "SEIC",
      open: 61.33,
      high: 62.14,
      low: 61.13,
      close: 62.12,
      adjusted: 62.12
  },
  {
      companyId: "02021",
      companyName: "ファースト・ファイナンシャル",
      lastRefreshed: "2021-07-09",
      ticker: "THFF",
      open: 38.98,
      high: 39.95,
      low: 37.695,
      close: 39.95,
      adjusted: 39.95
  },
  {
      companyId: "02005",
      companyName: "ブラウン・アンド・ブラウン",
      lastRefreshed: "2021-07-09",
      ticker: "BRO",
      open: 52.57,
      high: 53.125,
      low: 52.57,
      close: 52.95,
      adjusted: 52.95
  },
  {
      companyId: "00008",
      companyName: "MGEエナジー",
      lastRefreshed: "2021-07-09",
      ticker: "MGEE",
      open: 75.65,
      high: 76.32,
      low: 75.28,
      close: 76.22,
      adjusted: 76.22
  },
  {
      companyId: "03010",
      companyName: "エクスペディターズ・インターナショナル・オブ・ワシントン",
      lastRefreshed: "2021-07-09",
      ticker: "EXPD",
      open: 127.74,
      high: 128.54,
      low: 127.335,
      close: 128.4,
      adjusted: 128.4
  },
  {
      companyId: "00002",
      companyName: "アトモス・エナジー",
      lastRefreshed: "2021-07-09",
      ticker: "ATO",
      open: 98.22,
      high: 98.63,
      low: 97.15,
      close: 98.53,
      adjusted: 98.53
  },
  {
      companyId: "03001",
      companyName: "ABMインダストリーズ",
      lastRefreshed: "2021-07-09",
      ticker: "ABM",
      open: 42.96,
      high: 43.69,
      low: 42.88,
      close: 43.1,
      adjusted: 43.1
  },
  {
      companyId: "01005",
      companyName: "HBフラー",
      lastRefreshed: "2021-07-09",
      ticker: "FUL",
      open: 64.72,
      high: 65.29,
      low: 64.03,
      close: 64.58,
      adjusted: 64.58
  },
  {
      companyId: "03014",
      companyName: "W.W.グレインジャー",
      lastRefreshed: "2021-07-09",
      ticker: "GWW",
      open: 455.77,
      high: 457.87,
      low: 453.48,
      close: 456.83,
      adjusted: 456.83
  },
  {
      companyId: "00007",
      companyName: "MDUリソーシズ・グループ",
      lastRefreshed: "2021-07-09",
      ticker: "MDU",
      open: 31.19,
      high: 31.39,
      low: 30.98,
      close: 31.24,
      adjusted: 31.24
  },
  {
      companyId: "02020",
      companyName: "ファースト・ソース",
      lastRefreshed: "2021-07-09",
      ticker: "SRCE",
      open: 43.165,
      high: 44.44,
      low: 43.165,
      close: 44.32,
      adjusted: 44.32
  },
  {
      companyId: "03004",
      companyName: "キャタピラー",
      lastRefreshed: "2021-07-09",
      ticker: "CAT",
      open: 215.9,
      high: 218.5925,
      low: 214.4,
      close: 217.42,
      adjusted: 217.42
  },
  {
      companyId: "07001",
      companyName: "ジェニュイン･パーツ",
      lastRefreshed: "2021-07-09",
      ticker: "GPC",
      open: 129.11,
      high: 129.745,
      low: 128.19,
      close: 129.52,
      adjusted: 129.52
  },
  {
      companyId: "05017",
      companyName: "ウォルグリーン・ブーツ・アライアンス",
      lastRefreshed: "2021-07-09",
      ticker: "WBA",
      open: 46.71,
      high: 47.495,
      low: 46.68,
      close: 47.41,
      adjusted: 47.41
  },
  {
      companyId: "01002",
      companyName: "エアープロダクツ・アンド・ケミカルズ",
      lastRefreshed: "2021-07-09",
      ticker: "APD",
      open: 289.07,
      high: 291.82,
      low: 289.07,
      close: 291.67,
      adjusted: 291.67
  },
  {
      companyId: "06003",
      companyName: "ベクトン・ディッキンソン",
      lastRefreshed: "2021-07-09",
      ticker: "BDX",
      open: 251.65,
      high: 252.04,
      low: 247.79,
      close: 249.8,
      adjusted: 249.8
  },
  {
      companyId: "02024",
      companyName: "Ｔロウ・プライス・グループ",
      lastRefreshed: "2021-07-09",
      ticker: "TROW",
      open: 201.68,
      high: 205.64,
      low: 200.81,
      close: 205.2,
      adjusted: 205.2
  },
  {
      companyId: "02025",
      companyName: "ユナイテッド・バンクシェアーズ",
      lastRefreshed: "2021-07-09",
      ticker: "UBSI",
      open: 34.95,
      high: 35.57,
      low: 34.66,
      close: 35.52,
      adjusted: 35.52
  },
  {
      companyId: "02027",
      companyName: "ウェストアメリカ・バンコーポレーション",
      lastRefreshed: "2021-07-09",
      ticker: "WABC",
      open: 56.425,
      high: 57.01,
      low: 55.45,
      close: 56.81,
      adjusted: 56.81
  },
  {
      companyId: "05004",
      companyName: "クロロックス",
      lastRefreshed: "2021-07-09",
      ticker: "CLX",
      open: 182.07,
      high: 182.81,
      low: 180.11,
      close: 180.88,
      adjusted: 180.88
  },
  {
      companyId: "05013",
      companyName: "フィリップモリス",
      lastRefreshed: "2021-07-09",
      ticker: "PM",
      open: 99.37,
      high: 100.2,
      low: 98.93,
      close: 99.4,
      adjusted: 99.4
  },
  {
      companyId: "06001",
      companyName: "アッヴィ",
      lastRefreshed: "2021-07-09",
      ticker: "ABBV",
      open: 116.3,
      high: 117.325,
      low: 116.11,
      close: 116.58,
      adjusted: 116.58
  },
  {
      companyId: "02011",
      companyName: "コミュニティ・トラスト・バンコープ",
      lastRefreshed: "2021-07-09",
      ticker: "CTBI",
      open: 39.75,
      high: 40.465,
      low: 39.64,
      close: 40.2,
      adjusted: 40.2
  },
  {
      companyId: "01009",
      companyName: "ステファン",
      lastRefreshed: "2021-07-09",
      ticker: "SCL",
      open: 120.41,
      high: 121.78,
      low: 119.53,
      close: 120.39,
      adjusted: 120.39
  },
  {
      companyId: "01010",
      companyName: "シャーウィン・ウィリアムズ",
      lastRefreshed: "2021-07-09",
      ticker: "SHW",
      open: 275.73,
      high: 276.72,
      low: 273.45,
      close: 276.22,
      adjusted: 276.22
  },
  {
      companyId: "03022",
      companyName: "パーカー･ハネフィン",
      lastRefreshed: "2021-07-09",
      ticker: "PH",
      open: 311.35,
      high: 313.61,
      low: 310.355,
      close: 311.57,
      adjusted: 311.57
  },
  {
      companyId: "04004",
      companyName: "ジャック・ヘンリー&アソシエーツ",
      lastRefreshed: "2021-07-09",
      ticker: "JKHY",
      open: 167.11,
      high: 168.2145,
      low: 166.2036,
      close: 167.38,
      adjusted: 167.38
  },
  {
      companyId: "02019",
      companyName: "S&Pグローバル",
      lastRefreshed: "2021-07-09",
      ticker: "SPGI",
      open: 417.35,
      high: 419.48,
      low: 410.77,
      close: 414.68,
      adjusted: 414.68
  },
  {
      companyId: "02001",
      companyName: "アフラック",
      lastRefreshed: "2021-07-09",
      ticker: "AFL",
      open: 53.16,
      high: 53.565,
      low: 52.92,
      close: 53.35,
      adjusted: 53.35
  },
  {
      companyId: "01004",
      companyName: "エコラボ",
      lastRefreshed: "2021-07-09",
      ticker: "ECL",
      open: 211.94,
      high: 213.2,
      low: 211.1,
      close: 212.76,
      adjusted: 212.76
  },
  {
      companyId: "07008",
      companyName: "ウェイコ・グループ",
      lastRefreshed: "2021-07-09",
      ticker: "WEYS",
      open: 22.07,
      high: 22.2068,
      low: 21.66,
      close: 22,
      adjusted: 22
  },
  {
      companyId: "07002",
      companyName: "レゲット・アンド・プラット",
      lastRefreshed: "2021-07-09",
      ticker: "LEG",
      open: 50.77,
      high: 51.3,
      low: 50.45,
      close: 50.88,
      adjusted: 50.88
  },
  {
      companyId: "02023",
      companyName: "トムソン・ロイター",
      lastRefreshed: "2021-07-09",
      ticker: "TRI",
      open: 99.98,
      high: 101.58,
      low: 99.98,
      close: 101.46,
      adjusted: 101.46
  },
  {
      companyId: "05001",
      companyName: "アーチャー・ダニエルズ・ミッドランド",
      lastRefreshed: "2021-07-09",
      ticker: "ADM",
      open: 59.9,
      high: 60.48,
      low: 59.755,
      close: 60.32,
      adjusted: 60.32
  },
  {
      companyId: "05016",
      companyName: "ユニバーサル",
      lastRefreshed: "2021-07-09",
      ticker: "UVV",
      open: 55.26,
      high: 55.55,
      low: 54.07,
      close: 54.63,
      adjusted: 54.63
  },
  {
      companyId: "02007",
      companyName: "コマース・バンクシェアーズ",
      lastRefreshed: "2021-07-09",
      ticker: "CBSH",
      open: 72.47,
      high: 73.95,
      low: 72.24,
      close: 73.86,
      adjusted: 73.86
  },
  {
      companyId: "00009",
      companyName: "ネクステラ・エナジー",
      lastRefreshed: "2021-07-09",
      ticker: "NEE",
      open: 75,
      high: 75.42,
      low: 74.28,
      close: 74.99,
      adjusted: 74.99
  },
  {
      companyId: "05018",
      companyName: "ウォルマート",
      lastRefreshed: "2021-07-09",
      ticker: "WMT",
      open: 140.41,
      high: 140.84,
      low: 139.93,
      close: 140.3,
      adjusted: 140.3
  },
  {
      companyId: "03018",
      companyName: "マグラス・レントコープ",
      lastRefreshed: "2021-07-09",
      ticker: "MGRC",
      open: 78.67,
      high: 81.5,
      low: 77.53,
      close: 81.22,
      adjusted: 81.22
  },
  {
      companyId: "05003",
      companyName: "コルゲート・パルモリーブ",
      lastRefreshed: "2021-07-09",
      ticker: "CL",
      open: 82.67,
      high: 82.815,
      low: 82.27,
      close: 82.43,
      adjusted: 82.43
  },
  {
      companyId: "07007",
      companyName: "VFコーポレーション",
      lastRefreshed: "2021-07-09",
      ticker: "VFC",
      open: 81.79,
      high: 83.1,
      low: 81.66,
      close: 83.07,
      adjusted: 83.07
  },
  {
      companyId: "02017",
      companyName: "サウスサイド・バンクシェアーズ",
      lastRefreshed: "2021-07-09",
      ticker: "SBSI",
      open: 36.58,
      high: 37.21,
      low: 36.08,
      close: 37.15,
      adjusted: 37.15
  },
  {
      companyId: "00005",
      companyName: "カルフォルニア・ウォーター・サービス",
      lastRefreshed: "2021-07-09",
      ticker: "CWT",
      open: 57.54,
      high: 58.14,
      low: 57.22,
      close: 57.96,
      adjusted: 57.96
  },
  {
      companyId: "03008",
      companyName: "ドーバー",
      lastRefreshed: "2021-07-09",
      ticker: "DOV",
      open: 153.25,
      high: 153.66,
      low: 152.52,
      close: 153.46,
      adjusted: 153.46
  },
  {
      companyId: "06006",
      companyName: "メドトロニック",
      lastRefreshed: "2021-07-09",
      ticker: "MDT",
      open: 127.89,
      high: 128.61,
      low: 127.66,
      close: 128.17,
      adjusted: 128.17
  },
  {
      companyId: "01008",
      companyName: "RPMインターナショナル",
      lastRefreshed: "2021-07-09",
      ticker: "RPM",
      open: 89.9,
      high: 90.57,
      low: 89.35,
      close: 90.52,
      adjusted: 90.52
  },
  {
      companyId: "05012",
      companyName: "P&G",
      lastRefreshed: "2021-07-09",
      ticker: "PG",
      open: 137.24,
      high: 137.65,
      low: 136.84,
      close: 137.03,
      adjusted: 137.03
  },
  {
      companyId: "07004",
      companyName: "マクドナルド",
      lastRefreshed: "2021-07-09",
      ticker: "MCD",
      open: 234.07,
      high: 236.23,
      low: 233.06,
      close: 235.68,
      adjusted: 235.68
  }
]
