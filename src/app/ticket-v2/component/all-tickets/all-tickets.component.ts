import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILogpageFilter,
  TicketV2Service,
} from 'app/ticket-v2/ticket-v2.service';
import { ITicket, TICKET_EMAIL_TYPE } from 'app/ticket-v2/ticket.model';
import { TicketService } from 'app/ticket/ticket.service';
import { Constant } from 'app/utils/constant';
import { DateFormat } from 'app/utils/date-format';
import { NotificationService } from 'app/utils/notification.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss'],
})
export class AllTicketsComponent implements OnInit {
  public statusList: Array<{ name: string; value: string }> = Constant.STATUS;
  public priorityList: Array<{ name: string; value: string }> =
    Constant.PRIORITY_LIST;
  public sortByList: Array<{ name: string; value: string }> =
    Constant.SORT_BY_LIST;
  public sortBy: string = Constant.SORT_BY_LIST[0].value;

  // Pagination props
  public first: number = 0;
  public rows: number = 30;
  public totalRecords: number = 100;

  public checked: boolean = false;

  public ticketList: Array<ITicket> = [];
  public openReplyPanel: boolean = false;
  public replyType: TICKET_EMAIL_TYPE = null;
  public selectedTicket: ITicket = null;

  public isLoading: boolean = false;

  public filter: ILogpageFilter = {
    status: null,
    priority: null,
    contactName: null,
    dueDate: null,
    category: null,
    condition: null,
  };

  public searchText: string = '';
  public searchFlterTkts: Array<ITicket> = [];
  public displaySearch: boolean = true;

  constructor(
    protected router: Router,
    private ticketSvc: TicketV2Service,
    private notiSvc: NotificationService
  ) {}

  async ngOnInit() {
    await this.loadTickets();
  }

  private async loadTickets() {
    try {
      this.isLoading = true;
      const filter = JSON.parse(localStorage.getItem('log-page-filter'));
      if (filter) {
        this.filter = filter;
      }
      await this.loadTicketsByFilter();
    } catch (error) {
      console.error('Error: [loadTickets]', error);
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

  public onPageChange(event: any) {
    console.log('event:', event);
  }

  public async onApplyFilters(currFilter: ILogpageFilter) {
    try {
      this.filter = currFilter;
      localStorage.setItem('log-page-filter', JSON.stringify(currFilter));
      await this.loadTicketsByFilter();
    } catch (error) {
      console.error('Error: [onApplyFilters]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private generateQueryFilter(filter: ILogpageFilter) {
    try {
      let query = '';
      if (filter) {
        Object.keys(filter).forEach((key) => {
          if (filter[key]) {
            query = query
              ? query + `&${key}=${encodeURIComponent(filter[key])}`
              : `${key}=${encodeURIComponent(filter[key])}`;
          }
        });
      }
      return query;
    } catch (error) {
      console.error('Error: [generateQueryFilter]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private async loadTicketsByFilter() {
    try {
      this.isLoading = true;
      let query = this.generateQueryFilter(this.filter);
      const resp: any = await this.ticketSvc.loadTicketsByFilter(query);
      if (resp.success) {
        this.ticketList = this.formatTickets(resp.tickets) || [];
      }
    } catch (error) {
      console.error('Error: [loadTicketsByFilter]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public async searchTickets(event: any) {
    try {
      console.log('event:', event);
      const query = `search=${encodeURIComponent(event.query)}`;
      const resp: any = await this.ticketSvc.loadTicketsByFilter(query);
      if (resp.success) {
        this.searchFlterTkts = resp.tickets.map((tkt) => {
          tkt.subjWithTktNum =
            `[ ${tkt.ticketNumber} ] ${tkt.subject}`.slice(0, 70) + '...';
          return tkt;
        });
      }
    } catch (error) {
      console.error('Error: [searchTickets]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public onClickSearchItem(tkt: any) {
    console.log('tkt:', tkt);
    try {
      this.navigateToViewPage(tkt);
    } catch (error) {
      console.error('Error: [onClickSearchItem]', error);
      this.notiSvc.showIfError(error);
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

  public async onChangePriority(ticket: ITicket) {
    try {
      this.isLoading = false;
      const data = { priority: ticket.priority };
      const resp: any = await this.ticketSvc.updateTicketById(ticket._id, data);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Ticket Priority Update');
      }
    } catch (error) {
      console.error('Error: [onChangePriority]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  // private generateExcel(data: any[]) {
  //   try {
  //     const workbook = new Excel.Workbook();
  //     const worksheet = workbook.addWorksheet('Tickets');

  //     const header = Object.keys(data[0]);

  //     worksheet.columns = header;

  //     worksheet.columns = worksheet.columns.map((col, index) => {
  //       col.header = header[index];
  //       col.key = header[index];
  //       col.width = 25;
  //       col.font = { bold: true, size: 12 };
  //       col.alignment = { vertical: 'middle', horizontal: 'center' };
  //       return col;
  //     });

  //     const dataRows = worksheet.addRows(
  //       data.map((each) => {
  //         return Object.values(each);
  //       })
  //     );
  //     dataRows.forEach((row) => {
  //       row.eachCell((cell) => {
  //         cell.font = { bold: false, size: 11 };
  //         cell.alignment = { vertical: 'middle', horizontal: 'center' };
  //       });
  //     });

  //     workbook.xlsx.writeBuffer().then((excelData) => {
  //       const blob = new Blob([excelData], {
  //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       });
  //       FileSaver.saveAs(blob, 'Ticket_Report.xlsx');
  //       this.notiSvc.success(
  //         'Ticket is exported successfully',
  //         'Ticket Export'
  //       );
  //     });
  //   } catch (error) {
  //     console.error('Error: [generateExcel]', error);
  //   }
  // }

  private tranformtoExcelData(data: Array<ITicket>) {
    try {
      const structData = data.map((item) => {
        const obj = {
          'Ticket Number': item.ticketNumber,
          'Ticket Owner': item.ticketOwner,
          'Contact Name': item.contactName,
          'Contact Email': item.contactEmail,
          Subject: item.subject,
          'Thread Count': item.threadCount,
          Status: item.status,
          'Due Date': item.dueDate
            ? moment(item.dueDate).format('MMM/DD/YYYY')
            : '',
          'Created At': item.createdAt
            ? moment(item.createdAt).format('MMM/DD/YYYY')
            : '',
          Priority: item.priority,
          Resolution: item.resolution,
          Classifications: item.classifications,
          Category: item.category,
          'Sub-Category': item.subCategory,
          Sites: item.sites,
          Company: item.company,
          'Bug Type': item.bugType,
          Channel: item.channel,
          'Technical Team Assistance Needed':
            item.technicalTeamAssistanceNeeded,
          Description: item.description,
        };
        return obj;
      });
      return structData;
    } catch (error) {
      console.error('Error: [tranformtoExcelData]', error);
      throw error;
    }
  }

  public async onExport() {
    try {
      this.isLoading = true;
      const resp: any = await this.ticketSvc.loadAllTickets();
      if (resp?.tickets?.length > 0) {
        const data = this.tranformtoExcelData(resp.tickets);
        const workBook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workBook, worksheet, 'Tickets');
        XLSX.writeFile(workBook, `Ticket_Report.xlsx`);
      } else {
        this.notiSvc.warning(
          'There is nothing to export',
          'Ticket Excel Export'
        );
      }
    } catch (error) {
      console.error('Error: []', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }
}
