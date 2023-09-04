import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { ParkingZonesService } from 'src/app/services/zones.service';
import { City } from 'src/app/share/interfaces/city.inteface';
import { Zone } from 'src/app/share/interfaces/parking-zones.interface';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {
  form: FormGroup;
  cities: City[] = [];
  parkingZones: Zone[] = [];
  placeholderParkingZones: string = 'First select a city'

  constructor(private _fb: FormBuilder,
              private _citiesService: CitiesService,
              private _parkingZonesService: ParkingZonesService,
              ) {
    this.form = this._fb.group({
      plate: ['', Validators.required],
      city: ['', Validators.required],
      parkZone: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.get('parkZone')?.disable();
    this.getCities();
  }

  getCities(): void {
    this._citiesService.getCities().subscribe((response) => {
      this.cities = response.cities;
    });
  }

  onCitySelected() {
    if(this.form.get('city')?.dirty && this.form.get('city')?.value != '') {
      this.placeholderParkingZones = 'Select a Parking Zone';
      this.form.get('parkZone')?.enable();
      this.getParkingZonesByCityId(1)
    }
  }

  getParkingZonesByCityId(cityId: number): void {
    this._parkingZonesService.getZonesByCityId(cityId)
      .subscribe((response) => {
        this.parkingZones = response.parking_zones;
      });
  }

  isInvalidField(fieldName: string): boolean {
    if(this.form.get(fieldName)) {
      return this.form.get(fieldName)!.invalid && this.form.get(fieldName)!.touched;
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
    // call service to create a parking
    }
  }

}
