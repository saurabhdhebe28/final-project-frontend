import { Component } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-add-ocr',
  templateUrl: './add-ocr.component.html',
  styleUrls: ['./add-ocr.component.css']
})
export class AddOcrComponent {
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
