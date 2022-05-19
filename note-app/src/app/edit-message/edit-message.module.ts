import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMessagePageRoutingModule } from './edit-message-routing.module';

import { EditMessagePage } from './edit-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMessagePageRoutingModule
  ],
  declarations: [EditMessagePage]
})
export class EditMessagePageModule {}
