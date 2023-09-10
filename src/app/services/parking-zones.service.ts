import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ParkingZonesResponse } from "../share/interfaces/parking-zones.interface";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root',
  })
  export class ParkingZonesService {
    constructor(private _httpService: HttpService) {}

    getZonesByCityId(cityId: number): Observable<ParkingZonesResponse> {
        return this._httpService.get(`parking-zones?city-id=${cityId}`);
  }
}