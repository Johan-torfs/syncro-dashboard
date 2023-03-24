import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';
import { LocalGuard } from './security/local.guard';
import { RolesGuard } from './security/roles.guard';
import { SecurityComponent } from './security/security.component';
import { TicketFormComponent } from './ticket/ticket-form/ticket-form.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent, 
    canActivate:[AuthGuard] 
  },
  { 
    path: 'dashboard', 
    component: HomeComponent, 
    canActivate:[AuthGuard] 
  },
  { 
    path: 'tickets', 
    component: TicketListComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'tickets/form', 
    component: TicketFormComponent, 
    canActivate:[AuthGuard]
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate:[RolesGuard], 
    canActivateChild:[RolesGuard],
    data: {
      roles: ['admin']
    }
  },
  { 
    path: 'login', 
    component: SecurityComponent,
    canActivate:[LocalGuard]
  },
  { 
    path: 'register', 
    component: SecurityComponent,
    canActivate:[LocalGuard]
  },
  { 
    path: 'logout', 
    component: SecurityComponent, 
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
