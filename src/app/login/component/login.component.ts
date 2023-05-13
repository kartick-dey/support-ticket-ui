import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/utils/auth.service';
import { NotificationService } from 'app/utils/notification.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isLoading: boolean = false;
  public displayLogin: boolean = true;

  public email: string = '';
  public password: string = '';

  public message: string = '';

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private authSvc: AuthService,
    private confirmationService: ConfirmationService,
    private notiSvc: NotificationService
  ) {
    this.activedRouter.queryParams.subscribe((query) => {
      console.log('query : ', query);
      if (query?.message) {
        this.message = query.message;
        notiSvc.info(query.message, 'Confirmation');
      } else {
        this.message = null;
      }
    });
  }

  ngOnInit(): void {}

  public async onClickLogin() {
    try {
      this.isLoading = true;
      const resp: any = await this.authSvc.login(this.email, this.password);
      if (resp.success && resp.user) {
        this.authSvc.setUser(resp.user);
        this.notiSvc.success(resp.message, 'Login');
        this.router.navigate(['/ticket/log']);
      }
    } catch (error) {
      console.error('Error: [onClickLogin]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onClickResetPwdLink(event: any) {
    try {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to reset pasword?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.resetPassword();
        },
        reject: () => {
          return;
        },
      });
    } catch (error) {
      console.error('Error: [onClickResetPwdLink]', error);
    }
  }

  public async resetPassword() {
    try {
      this.isLoading = true;
      const resp: any = await this.authSvc.passwordReset(this.email);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Password Reset');
        this.email = null;
      }
    } catch (error) {
      console.error('Error: [resetPassword]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onClickForgetPwd() {
    this.displayLogin = false;
    this.message = null;
  }

  public onClickSignIn() {
    this.displayLogin = true;
  }

  public disabledBtn() {
    return this.displayLogin
      ? this.email && this.password
        ? false
        : true
      : this.email
      ? false
      : true;
  }
}
