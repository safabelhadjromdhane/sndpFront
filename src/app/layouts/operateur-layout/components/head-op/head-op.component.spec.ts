import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOpComponent } from './head-op.component';

describe('HeadOpComponent', () => {
  let component: HeadOpComponent;
  let fixture: ComponentFixture<HeadOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadOpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
