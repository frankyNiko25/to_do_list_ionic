import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMessagePage } from './edit-message.page';

const routes: Routes = [
  {
    path: '',
    component: EditMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMessagePageRoutingModule {}
