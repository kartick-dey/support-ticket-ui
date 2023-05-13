import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ITicket } from 'app/ticket-v2/ticket.model';
import { DateFormat } from 'app/utils/date-format';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
  @Output() onClickedTicket = new EventEmitter<any>();

  @Input() ticket: ITicket;

  constructor(protected router: Router) {}

  ngOnInit(): void {}

  public onClickTkt() {
    this.router.navigate([`/ticket/view/${this.ticket._id}`]);
    this.onClickedTicket.emit(this.ticket._id);
  }

  public getTimeFromNow(date: any) {
    return new DateFormat().getTimeFromNow(date);
  }

  public getAvatarTxt(name: string) {
    try {
      const splitNam = name.split(' ');
      return splitNam.length > 1
        ? `${splitNam[0][0]}${splitNam[1][0]}`
        : splitNam[0]?.slice(0, 2);
    } catch (error) {
      console.error('Error: []', error);
    }
  }
}
