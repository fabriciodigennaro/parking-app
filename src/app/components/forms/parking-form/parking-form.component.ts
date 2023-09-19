import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { ParkingZonesService } from 'src/app/services/parking-zones.service';
import { City } from 'src/app/share/interfaces/city.inteface';
import { ParkingZone } from 'src/app/share/interfaces/parking-zones.interface';
import { millisecondsToFormattedExpirationText } from 'src/app/share/utils/date-formater';
import { formatMinutes } from 'src/app/share/utils/time-formater';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  cities: City[] = [];
  parkingZones: ParkingZone[] = [];
  placeholderParkingZones: string = 'First select a city';
  finishingTime: string = millisecondsToFormattedExpirationText(new Date().getTime());
  timeInHours: string = '10 minutes';
  private subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private _citiesService: CitiesService,
    private _parkingZonesService: ParkingZonesService
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      plate: ['', Validators.required],
      city: ['', Validators.required],
      parkingZone: ['', Validators.required],
      duration: [10, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.get('parkingZone')?.disable();
    this.getCities();
    this.subscribeToDurationChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCities(): void {
    const citySubscription = this._citiesService.getCities().subscribe((response) => {
      this.cities = response.cities;
    });
    this.subscriptions.push(citySubscription);
  }

  onCitySelected() {
    const cityId = this.form.get('city')?.value;
    if (cityId != '') {
      this.placeholderParkingZones = 'Select a Parking Zone';
      this.form.get('parkingZone')?.enable();
      const parkingZoneSubscription = this.getParkingZonesByCityId(cityId);
      this.subscriptions.push(parkingZoneSubscription);
    }
  }

  getParkingZonesByCityId(cityId: number): Subscription {
    return this._parkingZonesService.getZonesByCityId(cityId).subscribe((response) => {
      this.parkingZones = response.parking_zones;
    });
  }

  subscribeToDurationChanges() {
    this.form.get('duration')?.valueChanges.subscribe((newValue: number) => {
      this.timeInHours = formatMinutes(newValue); 
      const minutesToMiliSeconds = newValue * 60 * 1000;
      const finishingTimeInMiliSeconds = new Date().getTime() + minutesToMiliSeconds
      this.finishingTime = millisecondsToFormattedExpirationText(finishingTimeInMiliSeconds);
    });
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && field.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      // Call service to create a parking
    }
  }
}
