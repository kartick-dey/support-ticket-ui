import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentLogComponent } from './environment-log.component';

describe('EnvironmentLogComponent', () => {
  let component: EnvironmentLogComponent;
  let fixture: ComponentFixture<EnvironmentLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
