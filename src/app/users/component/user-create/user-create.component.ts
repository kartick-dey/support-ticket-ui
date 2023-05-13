import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService, IUser } from 'app/utils/auth.service';
import { Constant } from 'app/utils/constant';
import { NotificationService } from 'app/utils/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  @Output() close = new EventEmitter<any>();

  public isLoading: boolean = false;

  public firstName: string = null;
  public lastName: string = null;
  public email: string = null;
  public role: string = null;

  public roleList: Array<{ name: string; value: string }> = Constant.ROLE_LIST;

  constructor(
    private authSvc: AuthService,
    private notiSvc: NotificationService
  ) {}

  ngOnInit(): void {}

  public disabledBtn() {
    return this.firstName && this.lastName && this.email ? false : true;
  }

  public async onCreate() {
    try {
      this.isLoading = true;
      const user: IUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: this.role || 'User',
      };
      const resp: any = await this.authSvc.createUser(user);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'New User');
        this.close.emit();
      }
    } catch (error) {
      console.error('Error: [onCreate]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }
}
