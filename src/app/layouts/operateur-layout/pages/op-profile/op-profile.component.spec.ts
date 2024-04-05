import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpProfileComponent } from './op-profile.component';

describe('OpProfileComponent', () => {
  let component: OpProfileComponent;
  let fixture: ComponentFixture<OpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
