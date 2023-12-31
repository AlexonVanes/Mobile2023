import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { BuscaPageRoutingModule } from './busca-routing.module';

import { BuscaPage } from './busca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BuscaPageRoutingModule
  ],
  declarations: [BuscaPage]
})
export class BuscaPageModule {}
