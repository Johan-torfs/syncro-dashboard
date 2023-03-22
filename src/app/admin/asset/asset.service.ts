import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private httpClient: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.httpClient.get<Asset[]>("http://localhost:3000/assets");
  }

  getAssetById(id: number): Observable<Asset> {
    return this.httpClient.get<Asset>("http://localhost:3000/assets/" + id);
  }

  postAsset(asset: Asset): Observable<Asset> {
      return this.httpClient.post<Asset>("http://localhost:3000/assets", asset);
  }

  patchAsset(id:number, asset: Asset): Observable<Asset> {
      return this.httpClient.patch<Asset>("http://localhost:3000/assets/" + id, asset);
  }

  deleteAsset(id: number): Observable<Asset> {
      return this.httpClient.delete<Asset>("http://localhost:3000/assets/" + id);
  }
}
