import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraAddComponent } from './usera-add.component';

describe('UseraAddComponent', () => {
  let component: UseraAddComponent;
  let fixture: ComponentFixture<UseraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
