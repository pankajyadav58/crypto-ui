import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { TransactionFilterPipe } from './transaction-filter.pipe';

import { routing } from './transaction.routing';
import { TransactionComponent } from './transaction.component';
import {TransactionService} from './transaction.service';
import {SendComponent} from './popup/send.component';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DateFilterPipe} from './../../filters/dateFormatFilter'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
    NgbDropdownModule,
    NgbModalModule
  ],
  declarations: [
    TransactionComponent,
    TransactionFilterPipe,
    SendComponent,
    DateFilterPipe

  ],
  providers: [
    TransactionService
  ],
  entryComponents: [
    SendComponent
  ]
})
export class TransactionModule {
}
