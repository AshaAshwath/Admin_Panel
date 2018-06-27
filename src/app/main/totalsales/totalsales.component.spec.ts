import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsalesComponent } from './totalsales.component';

describe('TotalsalesComponent', () => {
  let component: TotalsalesComponent;
  let fixture: ComponentFixture<TotalsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
