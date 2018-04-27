import { Routes, RouterModule }  from '@angular/router';

import { DetailTx } from './detailTx.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DetailTx
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
