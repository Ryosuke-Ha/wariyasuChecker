import { Component, OnInit } from '@angular/core';
import { UsCompanyService } from 'src/app/service/us-company/us-company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  usCompany$;
  selector$;

  lists$;

  constructor(
    private usCompanyService: UsCompanyService
  ) { }

  ngOnInit(): void {
    // this.usCompanyService.getUsCompanyAll().subscribe(res => {
    //   this.usCompany$ = res;
    // });

    // this.usCompanyService.getSectorAll().subscribe(res => {
    //   this.selector$ = res;
    // });


    this.lists$ = this.usCompanyService.getUsCompanyWithSectorName();
  }

}
