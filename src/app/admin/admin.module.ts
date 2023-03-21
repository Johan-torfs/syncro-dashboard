import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AssetModule } from './asset/asset.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    SharedModule,
    AssetModule,
    UserModule,
    RoleModule,
    AdminRoutingModule
  ],
  exports: [
    AssetModule,
    UserModule,
    RoleModule
  ]
})
export class AdminModule { }
