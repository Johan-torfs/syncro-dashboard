import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AssetFormComponent } from './asset/asset-form/asset-form.component';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { PriorityFormComponent } from './priority/priority-form/priority-form.component';
import { PriorityListComponent } from './priority/priority-list/priority-list.component';
import { TicketFormComponent } from './ticket/ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
    { path: 'assets', component: AssetListComponent },
    { path: 'assets/form', component: AssetFormComponent },
    { path: 'users', component: UserListComponent },
    { path: 'users/form', component: UserFormComponent },
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/form', component: TicketFormComponent },
    { path: 'priorities', component: PriorityListComponent },
    { path: 'priorities/form', component: PriorityFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}