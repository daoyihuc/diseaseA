import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddotherComponent } from './addother.component';

describe('AddotherComponent', () => {
  let component: AddotherComponent;
  let fixture: ComponentFixture<AddotherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddotherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
