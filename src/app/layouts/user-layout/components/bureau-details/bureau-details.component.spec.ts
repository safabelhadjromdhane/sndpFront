import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauDetailsComponent } from './bureau-details.component';

describe('BureauDetailsComponent', () => {
  let component: BureauDetailsComponent;
  let fixture: ComponentFixture<BureauDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BureauDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BureauDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
