import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ParkingZonesResponse } from "../share/interfaces/parking-zones.interface";
import { HttpService } from "./http.service";
import { HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })
  export class ParkingZonesService {
    constructor(private _httpService: HttpService) {}

    getZonesByCityId(cityId: number): Observable<ParkingZonesResponse> {
        const params = new HttpParams().set('city_id', cityId);
        return this._httpService.post('parking-zones', params)
  }
}