import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { ParkingZonesService } from 'src/app/services/zones.service';
import { City } from 'src/app/share/interfaces/city.inteface';
import { Zone } from 'src/app/share/interfaces/parking-zones.interface';
import { millisecondsToFormattedString } from 'src/app/share/utils/date-formater';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit {
  form: FormGroup;
  cities: City[] = [];
  parkingZones: Zone[] = [];
  placeholderParkingZones: string = 'First select a city';
  finishingTime: string = millisecondsToFormattedString(new Date().getTime());

  constructor(
    private _fb: FormBuilder,
    private _citiesService: CitiesService,
    private _parkingZonesService: ParkingZonesService
  ) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      plate: ['', Validators.required],
      city: ['', Validators.required],
      parkZone: ['', Validators.required],
      duration: [10, Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(": TIME", new Date().getTime());
    
    this.form.get('parkZone')?.disable();
    this.getCities();
    this.subscribeToDurationChanges();
  }

  getCities(): void {
    this._citiesService.getCities().subscribe((response) => {
      this.cities = response.cities;
    });
  }

  onCitySelected() {
    if (this.form.get('city')?.dirty && this.form.get('city')?.value != '') {
      this.placeholderParkingZones = 'Select a Parking Zone';
      this.form.get('parkZone')?.enable();
      this.getParkingZonesByCityId(1);
    }
  }

  getParkingZonesByCityId(cityId: number): void {
    this._parkingZonesService.getZonesByCityId(cityId).subscribe((response) => {
      this.parkingZones = response.parking_zones;
    });
  }

  subscribeToDurationChanges() {
    this.form.get('duration')?.valueChanges.subscribe((newValue: number) => {
      const minutesToMiliSeconds = newValue * 60 * 1000;
      const finishingTimeInMiliSeconds = new Date().getTime() + minutesToMiliSeconds
      this.finishingTime = millisecondsToFormattedString(finishingTimeInMiliSeconds);
    });
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && field.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      // Llamar al servicio para crear un estacionamiento
    }
  }
}
