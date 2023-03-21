import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AssetFormComponent } from './admin/asset/asset-form/asset-form.component';
import { AssetListComponent } from './admin/asset/asset-list/asset-list.component';

const routes: Routes = [
    { path: 'assets', component: AssetListComponent },
    { path: 'assets/form', component: AssetFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}