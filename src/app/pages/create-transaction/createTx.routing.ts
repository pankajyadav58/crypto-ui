import { Routes, RouterModule }  from '@angular/router';

import { CreateTx } from './createTx.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: CreateTx
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
