import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/share/interfaces/city.inteface';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent {
  form: FormGroup;
  cities: City[] = [];

  constructor(private _fb: FormBuilder,
              private _citiesService: CitiesService,
              ) {
    this.form = this._fb.group({
      plate: ['', [Validators.required]],
      city: ['', Validators.required],
      parkZone: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this._citiesService.getCities().subscribe((response) => {
      this.cities = response.cities;
    });
  }

  isInvalidField(fieldName: string): boolean {
    if(this.form.get(fieldName)) {
      return this.form.get(fieldName)!.invalid && this.form.get(fieldName)!.touched
    }
    return false
  }
  onSubmit() {
    if (this.form.valid) {
    
    }
  }

}
