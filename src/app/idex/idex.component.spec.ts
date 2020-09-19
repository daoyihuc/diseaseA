import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdexComponent } from './idex.component';

describe('IdexComponent', () => {
  let component: IdexComponent;
  let fixture: ComponentFixture<IdexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
