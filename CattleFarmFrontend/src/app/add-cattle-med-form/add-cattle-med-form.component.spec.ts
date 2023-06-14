import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCattleMedFormComponent } from './add-cattle-med-form.component';

describe('AddCattleMedFormComponent', () => {
  let component: AddCattleMedFormComponent;
  let fixture: ComponentFixture<AddCattleMedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCattleMedFormComponent]
    });
    fixture = TestBed.createComponent(AddCattleMedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
