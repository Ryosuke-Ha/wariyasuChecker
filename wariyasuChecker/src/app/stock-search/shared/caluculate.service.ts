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

  async caluculateForDisplay(){
    const itemList = await this.margeIndexAndLatestValue();
    return itemList;
  }

  private async margeIndexAndLatestValue(){
    let itemlist: any[] = new Array();

    this.latestValueService.getCollection().subscribe(latestList => {
        this.indexService.getCollection().subscribe(indexList => {
          for(let i = 0; i < latestList.length; i++){
            for(let y = 0; y < indexList.length; y++){
              if((latestList[i].companyId === indexList[y].id) && (Number(latestList[i].lastRefreshed.substr(0,4)) == indexList[y].year)){
                const item = {
                  id: indexList[y].id,
                  ticker: latestList[i].ticker,
                  tempPER: latestList[i].close / indexList[y].EPS,
                  tempPSR: latestList[i].close / indexList[y].SPS,
                  tempPBR: latestList[i].close / indexList[y].BPS,
                  tempYEILD: indexList[y].YEILD / latestList[i].close
                };
                itemlist.push(item);
              }
            }
          }
        });
      });
    return itemlist
  }

  margeWithAveList(list: any[]){
    let result: any[] = new Array();

    this.averageIndexService.getCollection().subscribe(aveList => {
      for(let i = 0;i < aveList.length; i++){
        for(let y = 0; y < list.length; y++){
          if(aveList[i].id == list[y].id){
            const item = {
                            id: aveList[i].id,
                            name: aveList[i].name,
                            ticker: list[y].ticker,
                            year: aveList[i].year,
                            tempPER: list[y].tempPER,
                            tempPSR: list[y].tempPSR,
                            tempPBR: list[y].tempPBR,
                            tempYEILD: list[y].tempYEILD,
                            highPER: aveList[i].highPER,
                            lowPER: aveList[i].lowPER,
                            highPSR: aveList[i].highPSR,
                            lowPSR: aveList[i].lowPSR,
                            highPBR: aveList[i].highPBR,
                            lowPBR: aveList[i].lowPBR,
                            highYeild: aveList[i].highYeild,
                            lowYeild: aveList[i].lowYeild
                          };
                          result.push(item);
          }
        }
      }
    });
    return result;
  }
}
