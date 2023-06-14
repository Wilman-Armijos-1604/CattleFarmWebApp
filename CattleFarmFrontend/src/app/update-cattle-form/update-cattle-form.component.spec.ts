import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCattleFormComponent } from './update-cattle-form.component';

describe('UpdateCattleFormComponent', () => {
  let component: UpdateCattleFormComponent;
  let fixture: ComponentFixture<UpdateCattleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCattleFormComponent]
    });
    fixture = TestBed.createComponent(UpdateCattleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
