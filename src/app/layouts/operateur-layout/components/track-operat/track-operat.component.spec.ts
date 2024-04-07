import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOperatComponent } from './track-operat.component';

describe('TrackOperatComponent', () => {
  let component: TrackOperatComponent;
  let fixture: ComponentFixture<TrackOperatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackOperatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackOperatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
