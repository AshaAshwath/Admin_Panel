import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewbannerComponent } from './addnewbanner.component';

describe('AddnewbannerComponent', () => {
  let component: AddnewbannerComponent;
  let fixture: ComponentFixture<AddnewbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
