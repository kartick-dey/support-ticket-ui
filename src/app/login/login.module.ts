import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/utils/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [AuthService, ConfirmationService],
})
export class LoginModule {}
