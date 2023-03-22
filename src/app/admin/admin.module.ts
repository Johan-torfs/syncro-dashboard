import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AssetModule } from './asset/asset.module';
import { PriorityModule } from './priority/priority.module';
import { RoleModule } from './role/role.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    SharedModule,
    AssetModule,
    UserModule,
    RoleModule,
    TicketModule,
    PriorityModule,
    AdminRoutingModule
  ],
  exports: [
    AssetModule,
    UserModule,
    RoleModule,
    TicketModule,
    PriorityModule
  ]
})
export class AdminModule { }
