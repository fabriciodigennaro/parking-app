import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking-form',
  templateUrl: './parking-form.component.html',
  styleUrls: ['./parking-form.component.scss']
})
export class ParkingFormComponent {
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      plate: ['', Validators.required],
      city: ['', Validators.required],
      parkZone: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
    
    }
}
}
