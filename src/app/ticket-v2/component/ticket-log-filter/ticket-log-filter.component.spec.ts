import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketLogFilterComponent } from './ticket-log-filter.component';

describe('TicketLogFilterComponent', () => {
  let component: TicketLogFilterComponent;
  let fixture: ComponentFixture<TicketLogFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketLogFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketLogFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
