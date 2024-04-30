import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBureauComponent } from './edit-bureau.component';

describe('EditBureauComponent', () => {
  let component: EditBureauComponent;
  let fixture: ComponentFixture<EditBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
