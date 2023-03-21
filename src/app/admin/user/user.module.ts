import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule,
    RoleModule
  ],
  exports: [
    UserListComponent,
    UserFormComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
