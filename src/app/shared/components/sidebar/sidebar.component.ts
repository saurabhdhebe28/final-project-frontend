import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) { }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  toOcrList() {
    this.router.navigate(['/ocr/ocrList'])
  }
  toOcrAdd() {
    this.router.navigate(['/ocr/addOcr'])
  }
}
