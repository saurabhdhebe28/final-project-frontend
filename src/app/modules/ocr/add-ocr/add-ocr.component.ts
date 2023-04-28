import { Component } from '@angular/core';
import { OcrService } from '../ocr.service';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms'

@Component({
  selector: 'app-add-ocr',
  templateUrl: './add-ocr.component.html',
  styleUrls: ['./add-ocr.component.css']
})
export class AddOcrComponent {
  url = new FormGroup({
    url : new FormControl('',[Validators.required])
  })
  inpValue: any;
  response!: any;
  constructor(private http: OcrService) { }

  urlToDb(url: string) {
    // this.inpValue = url
    let body: any = {
      url: url
    }
    this.http.addOcr(body).subscribe((data) => {
      console.log(data)
      
    })
  }
}
