import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CreateTx } from './createTx.component';
import { routing }       from './createTx.routing';
import {TransactionService} from './../transaction/transaction.service';

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
    CreateTx
    ],
  providers: [
    TransactionService
  ]
})
export class CreateTxModule {}
