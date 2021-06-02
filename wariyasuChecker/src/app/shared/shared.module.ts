import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const sharedComponents =[
  HeaderComponent,
  FooterComponent
]

@NgModule({
  declarations: [sharedComponents],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [sharedComponents]
})
export class SharedModule { }
