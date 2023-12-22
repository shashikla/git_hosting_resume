import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoFormValidationComponent } from './demo-form-validation.component';

describe('DemoFormValidationComponent', () => {
  let component: DemoFormValidationComponent;
  let fixture: ComponentFixture<DemoFormValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoFormValidationComponent]
    });
    fixture = TestBed.createComponent(DemoFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
