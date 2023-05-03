import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isDropdownOpen: any = {
    ocr: false,
    offers: false,
    voucher: false,
  };
  toggleDropdown(name: any) {
    this.isDropdownOpen[name] == false
      ? (this.isDropdownOpen[name] = true)
      : (this.isDropdownOpen[name] = false);
  }
}
