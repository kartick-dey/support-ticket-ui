import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IAttachment,
  ITicket,
  ITicketEmail,
  TICKET_EMAIL_TYPE,
} from 'app/ticket-v2/ticket.model';
import { Constant } from 'app/utils/constant';
import { DateFormat } from 'app/utils/date-format';
import { NotificationService } from 'app/utils/notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { TicketV2Service } from 'app/ticket-v2/ticket-v2.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, AfterViewInit {
  public replyType: TICKET_EMAIL_TYPE;
  public openReplyPanel: boolean = false;
  public ticketEmailThreads: Array<ITicketEmail> = null;
  public ticketId: string = null;
  public ticket: ITicket = null;
  public allTicket: Array<ITicket> = [];
  public isLoading: boolean = false;
  public statusList: Array<{ name: string; value: string }> = Constant.STATUS;
  public openEditTktPanel: boolean = false;
  public tktReplyBtnItems: MenuItem[];
  public draftEmailId: string = null;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    private notiSvc: NotificationService,
    private ticketSvc: TicketV2Service,
    private sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe((params) => {
      this.ticketId = params.ticketid;
    });
    this.loadReplyTktBtns();
  }
  ngAfterViewInit(): void {
    const img = document.getElementsByTagName('img');
    console.log('img:', img);
  }

  async ngOnInit() {
    await this.load();
  }

  private loadReplyTktBtns() {
    this.tktReplyBtnItems = [
      {
        label: 'Forward',
        command: () => {
          this.onClickReplyForward('Forward');
        },
      },
    ];
  }

  public async onClickedTicket(id: string) {
    try {
      if (this.ticketId === id) return;
      this.isLoading = true;
      this.ticketId = id;
      await this.loadTicket();
      await this.loadTicketEmailThreads();
    } catch (error) {
      console.error('Error: [onClickedTicket]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async load() {
    try {
      this.isLoading = true;
      await this.loadTicket();
      await this.loadTicketEmailThreads();
      await this.loadAllTickets();
    } catch (error) {
      console.error('Error: [load]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadAllTickets() {
    try {
      const resp: any = await this.ticketSvc.loadAllTickets();
      if (resp.success) {
        this.allTicket = resp.tickets || [];
        // this.allTicket = this.formatTickets(resp.tickets) || [];
      }
    } catch (error) {
      console.error('Erro: [loadAllTickets]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private async loadTicket() {
    try {
      const resp: any = await this.ticketSvc.loadTicketById(this.ticketId);
      console.log('loadTicketById resp:', resp);
      if (resp.success) {
        this.ticket = resp.ticket;
      }
    } catch (error) {
      console.error('Erro: [loadTicket]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private async loadTicketEmailThreads() {
    try {
      const resp: any = await this.ticketSvc.loadTicketEmailThreads(
        this.ticketId
      );
      console.log('loadTicketEmailThreads resp:', resp);
      if (resp.success) {
        this.ticketEmailThreads = resp.ticketEmails.map((el) => {
          /**
           * TODO: Need to remove once user details will punch in system
           */
          // el.senderName = el.from[0].address.match(/^(.+)@/)[1];
          // el.senderEmail = el.from[0].address;
          // el.recipientName = el.to[0].address?.match(/^(.+)@/)[1];
          // el.recipientEmail = el.from[0].address;
          el.expand = false;
          return el;
        });
      }
    } catch (error) {
      console.error('Erro: [loadTicket]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public senitizeHTML(html: any) {
    try {
      // html = html.replace(/<img/g, "<p-image")
      // html = html.replace(/img>/g, "p-image>")
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Error: [senitizeHTML]', error);
    }
  }

  public shortContent(str: string, charLen: number) {
    try {
      const normalStr = this.formatHTMLTagStringsToString(str);
      return normalStr.length > charLen
        ? normalStr.substring(0, charLen) + '...'
        : normalStr;
    } catch (error) {
      console.error('Error: []', error);
    }
  }

  public formatHTMLTagStringsToString(str: any) {
    try {
      const div = document.createElement('div');
      div.setAttribute('style', 'display: none');
      div.innerHTML = str;
      str = div.textContent || div.innerText || '';
      str = str.replace(/\s\s+/g, ' ');
      return str;
    } catch (error) {
      console.error('Error: [formatHTMLTagStringsToString]', error);
      throw error;
    }
  }

  public onClickReplyForward(type: TICKET_EMAIL_TYPE, tktEmail: any = null) {
    console.log('tktEmail:', tktEmail);
    this.replyType = type;
    this.openReplyPanel = true;
    if (tktEmail) {
      this.draftEmailId = tktEmail._id;
    } else {
      this.draftEmailId = null;
    }
  }

  public goBackToLogPage() {
    try {
      this.notiSvc.info(`Back to log page`, 'Back Clicked');
      this.router.navigate([`/ticket/log`]);
    } catch (error) {
      console.error('Error: [goBackToLogPage]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public async onAfterSaveAsDraft() {
    try {
      this.isLoading = true;
      await this.loadTicket();
      await this.loadTicketEmailThreads();
      this.openReplyPanel = false;
    } catch (error) {
      console.error('Error: [onAfterSaveAsDraft]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }
  public async onAfterReplyForward() {
    try {
      this.isLoading = true;
      await this.loadTicket();
      await this.loadTicketEmailThreads();
      this.openReplyPanel = false;
    } catch (error) {
      console.error('Error: [onAfterSaveAsDraft]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onClose() {
    this.openReplyPanel = false;
  }

  public displayDate(date: any) {
    return new DateFormat().formatToDisplay(date);
  }

  public getFullTimeAndDurations(date: any) {
    return `${new DateFormat().formatToDisplay(
      date
    )} (${new DateFormat().getTimeFromNow(date)})`;
  }

  public getTimeWithoutDayAndDurations(date: any) {
    return `${new DateFormat().formatToDisplayWithoutDay(
      date
    )} (${new DateFormat().getTimeFromNow(date)})`;
  }

  public onClickEditTkt() {
    this.openEditTktPanel = true;
  }

  public onCloseEditTkt() {
    this.openEditTktPanel = false;
  }

  public async downloadTktEmailDoc(attachment: IAttachment) {
    try {
      this.isLoading = true;
      await this.ticketSvc.downloadFile(attachment._id, attachment.name);
    } catch (error) {
      console.error('Error: []', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public async onChangeStatus(ticket: ITicket) {
    try {
      this.isLoading = false;
      const data = { status: ticket.status };
      const resp: any = await this.ticketSvc.updateTicketById(ticket._id, data);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Ticket Status Update');
      }
    } catch (error) {
      console.error('Error: [onChangeStatus]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }
}
