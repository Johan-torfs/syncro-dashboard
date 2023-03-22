import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/admin/asset/asset';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  assets$: Subscription = new Subscription();
  deleteAssets$: Subscription = new Subscription();

  errorMessage: string = '';
  search: string = '';

  constructor(private assetService: AssetService, private router: Router) {}

  ngOnInit(): void {
    this.getAssets();
  }

  ngOnDestroy(): void {
    this.assets$.unsubscribe();
    this.deleteAssets$.unsubscribe();
  }

  add() {
    this.router.navigate(['admin/assets/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/assets/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteAssets$ = this.assetService.deleteAsset(id).subscribe({
      next: (v) => this.getAssets(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getAssets() {
    this.assets$ = this.assetService.getAssets().subscribe(result => {
      this.assets = result;
      this.filterAssets();
    });
  }

  filterAssets() {
    if (this.search == '') {
      this.filteredAssets = this.assets;
      return;
    }

    this.filteredAssets = this.assets.filter(asset => {
      var search = this.search.toLowerCase();
      return (
        asset.name.toLowerCase().includes(search) || 
        asset.customer.firstname?.toLowerCase().includes(search) ||
        asset.customer.lastname?.toLowerCase().includes(search) ||
        asset.asset_type.toLowerCase().includes(search)
      );
    });
  }
}
