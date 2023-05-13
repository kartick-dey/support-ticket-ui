import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/utils/auth.service';
import { NotificationService } from 'app/utils/notification.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public isExpand: boolean = true;

  public menuItems: MenuItem[];

  public displayChngPwdPanel: boolean = false;

  public selectedMenu: string;

  constructor(
    private router: Router,
    private notiSvc: NotificationService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.navigateTo();
    this.setUserProfileMenuItems();
  }

  private navigateTo() {
    try {
      this.selectedMenu = localStorage.getItem('selected-menu')?.toString();
      if (!this.selectedMenu) {
        this.selectedMenu = 'Tickets';
      }
      // this.navigate(this.selectedMenu);
    } catch (error) {
      console.error('Error: [navigateTo]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private setUserProfileMenuItems() {
    this.menuItems = [
      {
        label: 'Change Password',
        icon: 'pi pi-lock',
        command: () => {
          this.onClickChangePwd();
        },
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onClickLogout();
        },
      },
    ];
  }

  public onClickChangePwd() {
    this.displayChngPwdPanel = true;
  }

  public onCloseChngPwdPanel() {
    this.displayChngPwdPanel = false;
    this.router.navigate(['/login'], {
      queryParams: {
        message: 'Your password has been changed successfully!',
      },
    });
  }

  public async onClickLogout() {
    try {
      const resp: any = await this.authSvc.logout();
      if (resp.success) {
        this.authSvc.setUser(null);
        this.router.navigate(['/login'], {
          queryParams: { message: 'You have been successfully logged out!' },
        });
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error: []', error);
      this.notiSvc.showIfError(error);
    }
  }

  public navigate(menuName: string) {
    try {
      this.selectedMenu = menuName;
      localStorage.setItem('selected-menu', menuName);
      switch (menuName) {
        case 'Tickets':
          this.router.navigate(['/ticket/log']);
          break;

        case 'Users':
          this.router.navigate(['/user/log']);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Error: [navigate]', error);
      this.notiSvc.showIfError(error);
    }
  }

  onExpandOrCollapse() {}
}
