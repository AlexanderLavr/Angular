import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterrationComponent } from './registerration.component';

describe('RegisterrationComponent', () => {
  let component: RegisterrationComponent;
  let fixture: ComponentFixture<RegisterrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
