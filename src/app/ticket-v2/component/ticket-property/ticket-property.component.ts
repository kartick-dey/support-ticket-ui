import { Component, Input, OnInit } from '@angular/core';
import { TicketV2Service } from 'app/ticket-v2/ticket-v2.service';
import { ITicket } from 'app/ticket-v2/ticket.model';
import { Constant } from 'app/utils/constant';
import { NotificationService } from 'app/utils/notification.service';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-ticket-property',
  templateUrl: './ticket-property.component.html',
  styleUrls: ['./ticket-property.component.scss'],
})
export class TicketPropertyComponent implements OnInit {
  @Input() ticket: ITicket;

  public priorityList: Array<{ name: string; value: string }> =
    Constant.PRIORITY_LIST;
  public classificationList: Array<{ name: string; value: string }> =
    Constant.CLASSIFICATION_LIST;
  public categoryList: Array<{ name: string; value: string }> =
    Constant.CATEGORY_LIST;
  public bugTypeList: Array<{ name: string; value: string }> =
    Constant.BUGTYPE_LIST;
  public techAssisNeedList: Array<{ name: string; value: string }> = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  public oldTicketData: ITicket = null;

  constructor(
    private ticketSvc: TicketV2Service,
    private notiSvc: NotificationService
  ) {}

  ngOnInit(): void {
    this.oldTicketData = { ...this.ticket };
  }

  public async onSave() {
    try {
      if (!isEqual(this.oldTicketData, this.ticket)) {
        const data: Partial<ITicket> = {
          dueDate: this.ticket.dueDate,
          priority: this.ticket.priority,
          sites: this.ticket.sites,
          company: this.ticket.company,
          category: this.ticket.category,
          subCategory: this.ticket.subCategory,
          bugType: this.ticket.bugType,
          technicalTeamAssistanceNeeded:
            this.ticket.technicalTeamAssistanceNeeded,
          description: this.ticket.description,
        };
        const resp: any = await this.ticketSvc.updateTicketById(
          this.ticket._id,
          data
        );
        if (resp.success) {
          this.notiSvc.success(resp.message, 'Ticket Update');
        }
      }
    } catch (error) {
      console.error('Error: [onSave]', error);
    }
  }
}
