import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuichetComponent } from './guichet.component';

describe('GuichetComponent', () => {
  let component: GuichetComponent;
  let fixture: ComponentFixture<GuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuichetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
