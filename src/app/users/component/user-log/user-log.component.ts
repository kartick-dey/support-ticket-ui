import { Component, OnInit } from '@angular/core';
import { AuthService, IUser } from 'app/utils/auth.service';
import { Constant } from 'app/utils/constant';
import { NotificationService } from 'app/utils/notification.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.scss'],
})
export class UserLogComponent implements OnInit {
  public openCreateUsrDlg: boolean = false;
  public displayCredDetails: boolean = false;

  public roleList: Array<{ name: string; value: string }> = Constant.ROLE_LIST;

  public userList: Array<IUser> = [];
  public isLoading: boolean = false;

  public clickedUser: any;

  constructor(
    private authSvc: AuthService,
    private notiSvc: NotificationService,
    private confirmationService: ConfirmationService
  ) {}

  async ngOnInit() {
    await this.loadAllUsers();
  }

  private async loadAllUsers() {
    try {
      this.isLoading = true;
      const resp: any = await this.authSvc.loadAllUsers();
      if (resp.success) {
        this.userList = resp.users
          .map((e) => {
            e.fullName = `${e.firstName} ${e.lastName}`;
            return e;
          })
          .sort((a, b) => a.fullName.localeCompare(b.fullName))
          .map((e, i) => {
            e.slno = i + 1;
            return e;
          });
      }
    } catch (error) {
      console.log('Error: [loadAllUsers]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public addNewUser() {
    this.openCreateUsrDlg = true;
  }

  public async onCloseUserDlg() {
    this.openCreateUsrDlg = false;
    this.loadAllUsers();
  }

  public getNameInitials(user: IUser) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  public async onChangeRole(user: IUser) {
    try {
      this.isLoading = true;
      const data = { role: user.role };
      const resp: any = await this.authSvc.updateUser(user.email, data);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'User Role Change');
      }
    } catch (error) {
      console.error('Error: [onChangeRole] ', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onResetPassword(event: any, user: IUser) {
    try {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to reset pasword?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.resetPassword(user);
        },
        reject: () => {
          return;
        },
      });
    } catch (error) {
      console.error('Error: [onResetPassword]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public async resetPassword(user: IUser) {
    try {
      this.isLoading = true;
      const resp: any = await this.authSvc.passwordResetByAdmin(user.email);
      if (resp.success) {
        this.displayCredDetails = true;
        this.clickedUser = user;
        this.clickedUser.password = resp.password;
      }
    } catch (error) {
      console.error('Error: [resetPassword]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onClickDeleteUser(event: any, user: IUser) {
    try {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to delete this user?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteUser(user.email);
        },
        reject: () => {
          return;
        },
      });
    } catch (error) {
      console.error('Error: [onClickDeleteUser]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public async deleteUser(email: string) {
    try {
      this.isLoading = true;
      const resp: any = await this.authSvc.deleteUser(email);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Delete User');
        await this.loadAllUsers();
      }
    } catch (error) {
      console.error('Error: [onClickDeleteUser]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public async onChangeStatus(event: any, user: IUser) {
    try {
      this.isLoading = true;
      const data = { active: user.active };
      const resp: any = await this.authSvc.updateUser(user.email, data);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'User Status Change');
      }
    } catch (error) {
      console.error('Error: [updateUserDetails] ', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }
}
