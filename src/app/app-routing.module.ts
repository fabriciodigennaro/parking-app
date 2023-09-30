import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ParkingFormComponent } from './components/forms/parking-form/parking-form.component';
import { SuccessMessageComponent } from './components/messages/success-message/success-message.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'parking-form', component: ParkingFormComponent },
  { path: 'success', component: SuccessMessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
