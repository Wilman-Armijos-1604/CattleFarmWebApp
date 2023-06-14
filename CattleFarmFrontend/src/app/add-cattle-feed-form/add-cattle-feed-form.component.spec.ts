import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCattleFeedFormComponent } from './add-cattle-feed-form.component';

describe('AddCattleFeedFormComponent', () => {
  let component: AddCattleFeedFormComponent;
  let fixture: ComponentFixture<AddCattleFeedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCattleFeedFormComponent]
    });
    fixture = TestBed.createComponent(AddCattleFeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
