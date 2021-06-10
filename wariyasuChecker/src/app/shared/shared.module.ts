import { NgModule } from '@angular/core';
import { ErrorModule } from './error/error-page/error.module';
import { SharedLayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [],
  imports: [SharedLayoutModule],
  exports: [
    SharedLayoutModule,
    ErrorModule
  ]
})
export class SharedModule { }
