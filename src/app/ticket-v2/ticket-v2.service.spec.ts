import { TestBed } from '@angular/core/testing';

import { TicketV2Service } from './ticket-v2.service';

describe('TicketV2Service', () => {
  let service: TicketV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
