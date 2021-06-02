import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// component
import { StockSearchComponent } from './stock-search.component';
import { StockListComponent } from './stock-list/stock-list.component';

// angular material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: StockSearchComponent}
];


@NgModule({
  declarations: [
    StockSearchComponent,
    StockListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule
  ]
})
export class StockSearchModule { }
