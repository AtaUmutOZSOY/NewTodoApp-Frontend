import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideListComponent } from './components/side-list/side-list.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SideListComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    NavbarComponent,
    SideListComponent
  ]
})
export class SharedModule { }
