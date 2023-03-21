import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleService } from './role.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    RoleService
  ]
})
export class RoleModule { }
