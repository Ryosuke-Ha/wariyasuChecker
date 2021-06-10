import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

const layoutComponents = [
  HeaderComponent,
  FooterComponent
]


@NgModule({
  declarations:[layoutComponents],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [layoutComponents]
})
export class SharedLayoutModule { }
