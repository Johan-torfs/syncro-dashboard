import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTicketModule } from './admin-ticket/admin-ticket.module';
import { AssetModule } from './asset/asset.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    SharedModule,
    AssetModule,
    UserModule,
    RoleModule,
    AdminTicketModule,
    PriorityModule,
    AdminRoutingModule,
  ],
  exports: [
    AssetModule,
    UserModule,
    RoleModule,
    AdminTicketModule,
    PriorityModule
  ]
})
export class AdminModule { }
