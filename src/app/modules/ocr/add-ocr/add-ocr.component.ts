import { Component } from '@angular/core';
import { OcrService } from '../ocr.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validator, ValidatorFn, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-ocr',
  templateUrl: './add-ocr.component.html',
  styleUrls: ['./add-ocr.component.css']
})
export class AddOcrComponent {
  selectedOption: any = 'url'

  htmlContent: string = '';
  files: any = {
    file: '',
    htmlTemplate: ''
  }
  inputUrl: any
  iframe: boolean = false

  fileExtensionValidator(allowedExtension: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const extension = file.split('.').pop();

        if (extension !== allowedExtension) {

          return { invalidExtension: true };
        }
      }
      return null;
    };
  }




  urlData = new FormGroup({
    url: new FormControl('', [Validators.required, Validators.pattern(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i)])
  })

  fileData = new FormGroup({
    file: new FormControl('', [Validators.required, this.fileExtensionValidator('html')])
  })
  // onUrlSelect(event: any) {
  //   if (this.urlData.valid) {
  //     this.ocrService.getHeaders(event.target.value).subscribe((response) => {
  //       let header = response.data
  //       console.log(header);

  //       if (!header['x-frame-options']) {
  //         this.iframe = true
  //         this.inputUrl = event.target.value
  //       }
  //       console.log(this.iframe)
  //     })

  //   }



  // }
  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    this.files.file = file
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.htmlContent = e.target.result;
      this.files.htmlTemplate = this.htmlContent
    };
    fileReader.readAsText(file);
  }


  constructor(private ocrService: OcrService, private http: HttpClient, private sanitizer: DomSanitizer) { }
  get url() {
    return this.urlData.get('url')
  }
  urlToDb() {
    let body = {
      url: this.url?.value
    }
    this.ocrService.addOcr(body).subscribe((response) => {
      this.urlData.reset()
    })
  }

  fileTOdb() {
    let formData = new FormData
    formData.append('file', this.files.file)
    formData.append('htmlTemplate', this.files.htmlTemplate)
    this.ocrService.addOcrByFile(formData).subscribe((data) => {
      this.fileData.reset()
    })
  }

}
