import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,NavComponent,SidebarComponent, DropdownComponent
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,NavComponent,SidebarComponent, DropdownComponent
  ],
})
export class SharedModule { }
