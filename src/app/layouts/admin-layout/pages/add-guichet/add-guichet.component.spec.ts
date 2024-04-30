import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuichetComponent } from './add-guichet.component';

describe('AddGuichetComponent', () => {
  let component: AddGuichetComponent;
  let fixture: ComponentFixture<AddGuichetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuichetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
