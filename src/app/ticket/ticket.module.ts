import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { LogComponent } from './component/log/log.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { ChipsModule } from 'primeng/chips';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';

import { ReplyForwardTicketComponent } from '../ticket-v2/component/reply-forward-ticket/reply-forward-ticket.component';
import { TicketService } from './ticket.service';
import { NotificationService } from 'app/utils/notification.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CalendarModule } from 'primeng/calendar';

import { ProgressLoaderModule } from 'app/progress-loader/progress-loader.module';
import { ViewComponent } from '../ticket-v2/component/view/view.component';
import { TicketCardComponent } from '../ticket-v2/component/ticket-card/ticket-card.component';
import { TicketPropertyComponent } from '../ticket-v2/component/ticket-property/ticket-property.component';

@NgModule({
  declarations: [
    LogComponent,
    ReplyForwardTicketComponent,
    ViewComponent,
    TicketCardComponent,
    TicketPropertyComponent,
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
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
  ],
  providers: [TicketService, NotificationService, MessageService],
})
export class TicketModule {}
