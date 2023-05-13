import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILogpageFilter } from 'app/ticket-v2/ticket-v2.service';
import { Constant } from 'app/utils/constant';
import { isEmpty } from 'lodash';

@Component({
  selector: 'ticket-log-filter',
  templateUrl: './ticket-log-filter.component.html',
  styleUrls: ['./ticket-log-filter.component.scss'],
})
export class TicketLogFilterComponent implements OnInit {
  @Output() applyFilter = new EventEmitter<any>();

  public statusList: Array<{ name: string; value: string }> = Constant.STATUS;
  public catList: Array<{ name: string; value: string }> =
    Constant.CATEGORY_LIST;
  public priorityList: Array<{ name: string; value: string }> =
    Constant.PRIORITY_LIST;
  public contactNameList: Array<{ name: string; value: string }> = [];
  public conditionalOp: Array<{ name: string; value: string }> = [
    { name: 'AND', value: 'AND' },
    { name: 'OR', value: 'OR' },
  ];

  public filter: ILogpageFilter = {
    status: null,
    priority: null,
    contactName: null,
    dueDate: null,
    category: null,
    condition: 'AND',
  };

  constructor() {}

  ngOnInit(): void {
    const filter = JSON.parse(localStorage.getItem('log-page-filter'));
    console.log('filter:', filter);
    if (filter) {
      this.filter = filter;
    }
  }

  public onApplyFilters() {
    try {
      this.applyFilter.emit(this.filter);
    } catch (error) {
      console.error('Error: [onApplyFilters]', error);
    }
  }
}
