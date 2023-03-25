import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { TicketModule } from './ticket/ticket.module';
import { CounterCardComponent } from './home/counter-card/counter-card.component';
import { PieChartComponent } from './home/pie-chart/pie-chart.component';
import { AreaChartComponent } from './home/area-chart/area-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    CounterCardComponent,
    PieChartComponent,
    AreaChartComponent
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
