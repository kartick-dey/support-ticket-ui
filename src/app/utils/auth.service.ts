import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected loggedInUser = null;
  constructor(private http: HttpClient) {}

  private constructHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };
  }

  public isLoggedIn(): boolean {
    return this.loggedInUser ? true : false;
  }

  public async isUserLoggedIn(): Promise<boolean> {
    try {
      let isLoggedIn = !!this.loggedInUser;
      if (!isLoggedIn) {
        const resp: any = await this.fetchLoggedInUser();
        if (resp.success && resp.user) {
          this.setUser(resp.user);
        }
        isLoggedIn = !!resp.user;
      }
      return isLoggedIn;
    } catch (error) {
      console.error('Error: [isUserLoggedIn]', error);
    }
  }

  public fetchLoggedInUser() {
    const url = `${config.serverAddress}/auth/user`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public login(email: string, password: string) {
    const url = `${config.serverAddress}/auth/login`;
    return this.http
      .post(url, { email, password }, this.constructHttpOptions())
      .toPromise();
  }

  public setUser(user: any) {
    try {
      if (user) {
        this.loggedInUser = user;
      } else {
        this.loggedInUser = null;
      }
    } catch (error) {
      console.error('Error: [setUser]', error);
      throw error;
    }
  }

  public getFullName() {
    return `${this.loggedInUser?.firstName} ${this.loggedInUser?.lastName}`;
  }

  public getEmail() {
    return this.loggedInUser?.email;
  }

  public async logout() {
    const url = `${config.serverAddress}/auth/logout`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public changePassword(pwd: IPasswordChange) {
    const url = `${config.serverAddress}/auth/change-password`;
    return this.http.post(url, pwd, this.constructHttpOptions()).toPromise();
  }

  public passwordReset(email: string) {
    const url = `${config.serverAddress}/auth/password-reset`;
    return this.http
      .post(url, { email: email }, this.constructHttpOptions())
      .toPromise();
  }

  public createUser(user: IUser) {
    const url = `${config.serverAddress}/auth/create`;
    return this.http.post(url, user, this.constructHttpOptions()).toPromise();
  }

  public loadAllUsers() {
    const url = `${config.serverAddress}/auth/load/all/users`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public updateUser(email: string, data: any) {
    const url = `${config.serverAddress}/auth/update/${email}`;
    return this.http.put(url, data, this.constructHttpOptions()).toPromise();
  }

  public deleteUser(email: string) {
    const url = `${config.serverAddress}/auth/delete/${email}`;
    return this.http.delete(url, this.constructHttpOptions()).toPromise();
  }

  public passwordResetByAdmin(email: string) {
    const url = `${config.serverAddress}/auth/reset/password/by/admin`;
    return this.http
      .post(url, { email: email }, this.constructHttpOptions())
      .toPromise();
  }
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  fullName?: string;
  active?: boolean;
}

export interface IPasswordChange {
  oldPassword: string;
  newPassword: string;
}
