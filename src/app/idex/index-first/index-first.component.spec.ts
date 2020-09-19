import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFirstComponent } from './index-first.component';

describe('IndexFirstComponent', () => {
  let component: IndexFirstComponent;
  let fixture: ComponentFixture<IndexFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
