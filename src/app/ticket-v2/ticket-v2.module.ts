import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TicketV2RoutingModule } from './ticket-v2-routing.module';
import { AllTicketsComponent } from './component/all-tickets/all-tickets.component';
import { TicketLogFilterComponent } from './component/ticket-log-filter/ticket-log-filter.component';
import { ReplyForwardTicketComponent } from './component/reply-forward-ticket/reply-forward-ticket.component';
import { TicketCardComponent } from './component/ticket-card/ticket-card.component';
import { TicketPropertyComponent } from './component/ticket-property/ticket-property.component';
import { ViewComponent } from './component/view/view.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { TicketV2Service } from './ticket-v2.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from 'app/utils/notification.service';
import { ToolbarModule } from 'primeng/toolbar';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { ChipsModule } from 'primeng/chips';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ProgressLoaderModule } from 'app/progress-loader/progress-loader.module';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AllTicketsComponent,
    TicketLogFilterComponent,
    ReplyForwardTicketComponent,
    ViewComponent,
    TicketCardComponent,
    TicketPropertyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TicketV2RoutingModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    PaginatorModule,
    ScrollPanelModule,
    CheckboxModule,
    TooltipModule,
    CalendarModule,
    CommonModule,
    ToolbarModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    TooltipModule,
    EditorModule,
    SidebarModule,
    ChipsModule,
    BadgeModule,
    DialogModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    ProgressLoaderModule,
    VirtualScrollerModule,
    CardModule,
    AvatarModule,
    DropdownModule,
    ImageModule,
    SplitButtonModule,
    CalendarModule,
    InputTextareaModule,
    AutoCompleteModule,
  ],
  providers: [TicketV2Service, , NotificationService, MessageService],
})
export class TicketV2Module {}
