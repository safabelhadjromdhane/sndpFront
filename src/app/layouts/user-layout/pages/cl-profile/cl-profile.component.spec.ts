import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClProfileComponent } from './cl-profile.component';

describe('ClProfileComponent', () => {
  let component: ClProfileComponent;
  let fixture: ComponentFixture<ClProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
