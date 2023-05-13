import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';

import { ToolbarModule } from 'primeng/toolbar';
import { EnvironmentModule } from './environment/environment.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from './utils/notification.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { UserProfileModule } from './user-profile/user-profile.module';
import { TicketHttpInterceptor } from './ticket-http.interceptor';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    EnvironmentModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    ToastModule,
    HttpClientModule,
    MenuModule,
    DialogModule,
    UserProfileModule,
  ],
  providers: [
    MessageService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TicketHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
