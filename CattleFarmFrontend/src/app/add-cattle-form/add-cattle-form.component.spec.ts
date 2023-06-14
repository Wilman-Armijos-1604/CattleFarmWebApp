import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCattleFormComponent } from './add-cattle-form.component';

describe('AddCattleFormComponent', () => {
  let component: AddCattleFormComponent;
  let fixture: ComponentFixture<AddCattleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCattleFormComponent]
    });
    fixture = TestBed.createComponent(AddCattleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
