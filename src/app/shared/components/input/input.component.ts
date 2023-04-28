import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
@Input() label:string=''
@Input() type:string='text'
@Input() placeholder:string=''
@Input() control!: FormControl;
@Output() e=new EventEmitter<String>()
inpValue:any;

inp(){
  this.e.emit(this.inpValue);
}

}
