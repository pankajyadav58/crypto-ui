import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';

import { DetailTx } from './detailTx.component';
import { routing }       from './detailTx.routing';
import {TransactionService} from './../transaction.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    DetailTx
    ],
  providers: [
    TransactionService
  ]
})
export class DetailTxModule {}
