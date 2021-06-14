import { Injectable } from '@angular/core';
import { AverageIndexService } from 'src/app/shared/services/averageIndex/average-index.service';
import { IndexService } from 'src/app/shared/services/index/index.service';
import { LatestValueService } from 'src/app/shared/services/latestValue/latest-value.service';

@Injectable({
  providedIn: 'root'
})
export class CaluculateService {

  constructor(
    private latestValueService: LatestValueService,
    private indexService: IndexService,
    private averageIndexService: AverageIndexService,
  ) { }

  caluculateForDisplay(){
    let itemlist: any[] = new Array();
    let result: any[] = new Array();

    this.latestValueService.getCollection().subscribe(latestList => {
      this.indexService.getCollection().subscribe(indexList => {
        latestList.forEach(latest => {
          indexList.forEach(index => {
            if((latest.companyId === index.id) && (Number(latest.lastRefreshed.substr(0,4)) == index.year)){
              const item = {
                id: index.id,
                ticker: latest.ticker,
                tempPER: latest.close / index.EPS,
                tempPSR: latest.close / index.SPS,
                tempPBR: latest.close / index.BPS,
                tempYEILD: index.YEILD / latest.close
              };
              itemlist.push(item);
            }
          })
        });
      });
    });

    this.averageIndexService.getCollection().subscribe(aveList => {
      const uniquAveList = new Map(aveList.map(a => [a.id, a]));
      result = itemlist.map(({ id, ...rest }) => ({
        ...rest,
        ...uniquAveList.get(id)
      }));

      console.log(result)
    });

    return result;
  }
}
