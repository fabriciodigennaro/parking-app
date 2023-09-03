import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private _router: Router){}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  getMenuToggleClass(): string {
    return this.isMenuOpen ? 'close' : '';
  }

  redirectHome(): void {
    this.closeMenu();
    this._router.navigate(['/'])
  }

  openParkForm(): void {
    this.closeMenu();
    this._router.navigate(['/parking-form'])
  }

  redirectHelp(): void {
    this.closeMenu();
    this._router.navigate(['/help'])
  }
}
