import { Component, OnInit } from '@angular/core';
import { OcrService } from '../ocr.service';
import { saveAs } from 'file-saver';
// import { log } from 'console';



@Component({
  selector: 'app-ocr-list',
  templateUrl: './ocr-list.component.html',
  styleUrls: ['./ocr-list.component.css']
})
export class OcrListComponent implements OnInit {
  constructor(private http: OcrService) { }
  requestedBy: any = ''
  tin: any = ''
  disableButtonvalue = true
  itemsPerPage: number = 4
  currentPage: number = 1
  totalItem: number = 0
  data: any
  ngOnInit(): void {
    this.getOcrData()
  }
  getOcrData() {
    this.http.ocrList().subscribe((value: any) => {
      if (typeof value.data != 'string') {
        this.data = value.data
        this.totalItem = this.data.length
      }

    })

  }
  onPageChange(event: any) {
    this.currentPage = event
  }
  disableButton() {
    this.disableButtonvalue = !this.requestedBy && !this.tin
  }
  search() {
    this.http.ocrListSearch(this.requestedBy, this.tin).subscribe((value) => {
      this.data = value.data
      this.totalItem = this.data.length
    })

  }

  redirect(url: any) {
    window.open(url, '_blank');
  }
  download(path: any) {
    this.http.downLoadFile({
      responseType: 'blob',
      params: {
        filePath: path
      }
    }).subscribe((file) => {
      const blob = new Blob([file], { type: 'text/html' });
      saveAs(blob, 'file.html')
    })
  }
}
