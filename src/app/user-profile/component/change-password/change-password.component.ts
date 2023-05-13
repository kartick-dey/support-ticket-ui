import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService, IPasswordChange } from 'app/utils/auth.service';
import { NotificationService } from 'app/utils/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [AuthService],
})
export class ChangePasswordComponent implements OnInit {
  @Output() close = new EventEmitter<any>();

  public oldPwd: string;
  public newPwd: string;
  public cnfrmPwd: string;

  public isLoading: boolean = false;

  constructor(
    private notiSvc: NotificationService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {}

  public async onClickChangePwd() {
    try {
      this.isLoading = true;
      if (this.newPwd.length < 8 || this.newPwd.length > 16) {
        this.notiSvc.error('New Password should be between 8 to 16 characters');
        return;
      }
      if (this.newPwd !== this.cnfrmPwd) {
        this.notiSvc.error(
          `New and confirm password doesn't match`,
          'Password Missmatch'
        );
        return;
      }
      const pwd: IPasswordChange = {
        oldPassword: this.oldPwd,
        newPassword: this.newPwd,
      };
      const resp: any = await this.authSvc.changePassword(pwd);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Password Changed');
      }
      this.isLoading = false;
      this.close.emit();
    } catch (error) {
      console.error('Error: [onClickChangePwd]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public disabledBtn() {
    return this.oldPwd && this.newPwd && this.cnfrmPwd ? false : true;
  }
}
