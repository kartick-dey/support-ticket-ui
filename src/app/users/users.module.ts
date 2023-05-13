import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogComponent } from './component/user-log/user-log.component';
import { UsersRoutingModule } from './users-routing.module';

import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { UserCreateComponent } from './component/user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/utils/auth.service';
import { ProgressLoaderModule } from 'app/progress-loader/progress-loader.module';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import {ToggleButtonModule} from 'primeng/togglebutton';


@NgModule({
  declarations: [UserLogComponent, UserCreateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AvatarModule,
    DropdownModule,
    BadgeModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    ProgressLoaderModule,
    DialogModule,
    InputTextModule,
    ConfirmPopupModule,
    ToggleButtonModule
  ],
  providers: [AuthService, ConfirmationService]
})
export class UsersModule {}
