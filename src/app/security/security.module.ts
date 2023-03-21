import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SecurityModule { }
