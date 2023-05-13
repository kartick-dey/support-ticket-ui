import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITicket, TICKET_EMAIL_TYPE } from 'app/ticket-v2/ticket.model';
import { TicketService } from 'app/ticket/ticket.service';
import { Constant } from 'app/utils/constant';
import { DateFormat } from 'app/utils/date-format';
import { NotificationService } from 'app/utils/notification.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  public checked: boolean = false;

  public ticketList: Array<ITicket> = [];
  public openReplyPanel: boolean = false;
  public replyType: TICKET_EMAIL_TYPE = null;
  public selectedTicket: ITicket = null;

  public isLoading: boolean = false;

  public statusList: Array<{ name: string; value: string }> = Constant.STATUS;


  constructor(
    protected router: Router,
    private ticketSvc: TicketService,
    private notiSvc: NotificationService
  ) {}

  async ngOnInit() {
    await this.loadAllTicket();
  }

  private async loadAllTicket() {
    try {
      this.isLoading = true;
      const resp: any = await this.ticketSvc.loadAllTickets();
      if (resp.success) {
        this.ticketList = this.formatTickets(resp.tickets) || [];
      }
    } catch (error) {
      console.error('Error: [loadAllTicket]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private formatTickets(tickets: Array<any>) {
    try {
      return tickets.map((ticket) => {
        const _ticket: ITicket = ticket;
        _ticket.checked = false;
        _ticket.draft = false;
        _ticket.hover = false;
        _ticket.replyed = ticket.threadCount > 0 ? true : false;
        return _ticket;
      });
    } catch (error) {
      throw error;
    }
  }

  public openNewTicketForm(event: any) {
    console.log(this.openNewTicketForm.name);
  }

  public onClickSort(event: Event) {
    event.stopPropagation();
    console.log('Tickets : ', this.ticketList);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 10000);
  }

  public onClickReplyForward(ticket: ITicket, type: TICKET_EMAIL_TYPE) {
    this.replyType = type;
    this.openReplyPanel = true;
    this.selectedTicket = ticket;
  }

  public onAfterSaveAsDraft() {
    this.openReplyPanel = false;
  }
  public onAfterReplyForward() {
    this.openReplyPanel = false;
  }

  public onClose() {
    this.openReplyPanel = false;
  }

  public navigateToViewPage(ticket: ITicket) {
    try {
      this.notiSvc.info(`Ticket Id - ${ticket._id}`, 'Ticket Clicked');
      this.router.navigate([`/ticket/view/${ticket._id}`]);
    } catch (error) {
      console.error('Error: [navigateToViewPage]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public getTimeWithoutDayAndDurations(date: any) {
    return `${new DateFormat().formatToDisplayWithoutDay(
      date
    )} (${new DateFormat().getTimeFromNow(date)})`;
  }
}
