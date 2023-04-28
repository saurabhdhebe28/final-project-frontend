import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOcrComponent } from './add-ocr.component';

describe('AddOcrComponent', () => {
  let component: AddOcrComponent;
  let fixture: ComponentFixture<AddOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
