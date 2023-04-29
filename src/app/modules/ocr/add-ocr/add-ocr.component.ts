import { Component } from '@angular/core';
import { OcrService } from '../ocr.service';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-ocr',
  templateUrl: './add-ocr.component.html',
  styleUrls: ['./add-ocr.component.css']
})
export class AddOcrComponent {
  urlData = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)])
  })

  constructor(private ocrService: OcrService) { }
  get url() {
    return this.urlData.get('url')
  }
  urlToDb() {
    let body = {
      url: this.url?.value
    }

    this.ocrService.addOcr(body).subscribe((response) => {

    })
  }
}
