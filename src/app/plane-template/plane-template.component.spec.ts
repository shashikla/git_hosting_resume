import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneTemplateComponent } from './plane-template.component';

describe('PlaneTemplateComponent', () => {
  let component: PlaneTemplateComponent;
  let fixture: ComponentFixture<PlaneTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneTemplateComponent]
    });
    fixture = TestBed.createComponent(PlaneTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
