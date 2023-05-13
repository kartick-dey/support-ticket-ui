import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentCreateComponent } from './component/environment-create/environment-create.component';
import { EnvironmentLogComponent } from './component/environment-log/environment-log.component';
import { EnvironmentConfigComponent } from './component/environment-config/environment-config.component';
import { EnvironmentComponent } from './environment.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    EnvironmentCreateComponent,
    EnvironmentLogComponent,
    EnvironmentConfigComponent,
    EnvironmentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    SidebarModule
  ],
})
export class EnvironmentModule {}
