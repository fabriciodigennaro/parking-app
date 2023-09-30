import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { ParkingRequest, ParkingResponse } from "../share/interfaces/parking.interface";

@Injectable({
    providedIn: 'root',
})
export class ParkingService {
    constructor(private _httpService: HttpService) {}

    createParking(params: ParkingRequest):Observable<ParkingResponse> {
        return this._httpService.post('parkings', params)
    }
}