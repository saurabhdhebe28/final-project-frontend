import { Component, OnInit } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-ocr-list',
  templateUrl: './ocr-list.component.html',
  styleUrls: ['./ocr-list.component.css']
})
export class OcrListComponent implements OnInit {
  constructor(private http: OcrService) { }
  itemsPerPage: number = 5
  currentPage: number = 1
  totalItem: number = 0
  data: any
  ngOnInit(): void {
    this.getOcrData()
  }
  getOcrData() {
    this.http.ocrList().subscribe((value: any) => {
      this.data = value.data
      this.totalItem = this.data.length
    })
  }
  onPageChange(event: any) {

  }
}
