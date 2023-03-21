import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AssetModule } from './asset/asset.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AssetModule
  ],
  exports: [
    AssetModule
  ]
})
export class AdminModule { }
