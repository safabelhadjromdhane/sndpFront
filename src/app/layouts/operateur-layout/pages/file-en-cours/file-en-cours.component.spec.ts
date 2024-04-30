import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileEnCoursComponent } from './file-en-cours.component';

describe('FileEnCoursComponent', () => {
  let component: FileEnCoursComponent;
  let fixture: ComponentFixture<FileEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileEnCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
