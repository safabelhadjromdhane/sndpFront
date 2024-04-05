import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpboardComponent } from './opboard.component';

describe('OpboardComponent', () => {
  let component: OpboardComponent;
  let fixture: ComponentFixture<OpboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
