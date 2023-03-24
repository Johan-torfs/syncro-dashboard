import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  assetId: number = 0;

  customers: User[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  asset$: Subscription = new Subscription();
  customers$: Subscription = new Subscription();
  postAsset$: Subscription = new Subscription();
  putAsset$: Subscription = new Subscription();

  assetForm = new FormGroup({
    name: new FormControl(''),
    customerId: new FormControl(0),
    asset_type: new FormControl('')
  });

  constructor(private router: Router, private assetService: AssetService, private userService: UserService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.assetId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    this.customers$ = this.userService.getCustomers().subscribe(result => {
      this.customers = result;
    });

    if (this.assetId != null && this.assetId > 0) {
      this.asset$ = this.assetService.getAssetById(this.assetId).subscribe(result => {
        this.assetForm.setValue({
          name: result.name || "",
          customerId: result.customer.id,
          asset_type: result.asset_type
        });
      });
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.asset$.unsubscribe();
    this.customers$.unsubscribe();
    this.postAsset$.unsubscribe();
    this.putAsset$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postAsset$ = this.assetService.postAsset(this.assetForm.value as Asset).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/assets"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putAsset$ = this.assetService.patchAsset(this.assetId, this.assetForm.value as Asset).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/assets"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  back() {
    this.router.navigateByUrl("/admin/assets");
  }
}
