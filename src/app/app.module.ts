import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { TicketModule } from './ticket/ticket.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SecurityModule,
    SharedModule,
    TicketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
