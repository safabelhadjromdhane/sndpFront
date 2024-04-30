import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuichetListComponent } from './guichet-list.component';

describe('GuichetListComponent', () => {
  let component: GuichetListComponent;
  let fixture: ComponentFixture<GuichetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuichetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuichetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
