import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CitiesResponse } from "../share/interfaces/city.inteface";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root',
  })
  export class CitiesService {
    constructor(private _httpService: HttpService) {}

    getCities(): Observable<CitiesResponse> {
        return this._httpService.get('cities');
  }
}