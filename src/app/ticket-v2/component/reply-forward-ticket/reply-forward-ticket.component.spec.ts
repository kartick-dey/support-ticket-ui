import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyForwardTicketComponent } from './reply-forward-ticket.component';

describe('ReplyForwardTicketComponent', () => {
  let component: ReplyForwardTicketComponent;
  let fixture: ComponentFixture<ReplyForwardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyForwardTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyForwardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
