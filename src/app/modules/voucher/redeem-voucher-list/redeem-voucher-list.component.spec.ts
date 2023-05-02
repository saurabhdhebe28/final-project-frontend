import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemVoucherListComponent } from './redeem-voucher-list.component';

describe('RedeemVoucherListComponent', () => {
  let component: RedeemVoucherListComponent;
  let fixture: ComponentFixture<RedeemVoucherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemVoucherListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemVoucherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
