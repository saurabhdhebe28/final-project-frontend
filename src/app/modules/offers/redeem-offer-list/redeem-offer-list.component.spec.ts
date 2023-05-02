import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemOfferListComponent } from './redeem-offer-list.component';

describe('RedeemOfferListComponent', () => {
  let component: RedeemOfferListComponent;
  let fixture: ComponentFixture<RedeemOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemOfferListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
