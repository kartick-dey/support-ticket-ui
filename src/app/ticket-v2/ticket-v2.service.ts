import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/config';
import { ITicket, ITicketReplyData, TICKET_EMAIL_TYPE } from './ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketV2Service {
  constructor(private http: HttpClient) {}

  private constructHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };
  }

  private constructHttpOptionsForFileUpload() {
    return {
      headers: new HttpHeaders({}),
      withCredentials: true,
    };
  }

  public uploadFiles(file: any, ticketId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('ticketId', ticketId);
    const url = `${config.serverAddress}/attachment/upload`;
    return this.http
      .post(url, formData, this.constructHttpOptionsForFileUpload())
      .toPromise();
  }

  public async downloadFile(docId: string, fileName: string) {
    const apiUrl = `${config.serverAddress}/attachment/download/${docId}`;
    const blob = await this.http
      .get<Blob>(apiUrl, {
        responseType: 'blob' as 'json',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true,
      })
      .toPromise();

    const url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public loadAllTickets() {
    const url = `${config.serverAddress}/ticket/load/all`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public loadTicketsByFilter(query: any) {
    let url = `${config.serverAddress}/ticket/load/filter`;
    if (query) {
      url = url + `?${query}`;
    }
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public loadTicketById(ticketId: string) {
    const url = `${config.serverAddress}/ticket/load/ticket/${ticketId}`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public loadTicketEmailThreads(ticketId: string) {
    const url = `${config.serverAddress}/ticket/load/ticket-email-threads/${ticketId}`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public replyTicket(payload: ITicketReplyData) {
    const url = `${config.serverAddress}/ticket/reply-ticket`;
    return this.http
      .post(url, payload, this.constructHttpOptions())
      .toPromise();
  }

  public loadTicketEmailByThread(ticketId: string, threadNum: number) {
    const url = `${config.serverAddress}/ticket/load/ticket-email/by/thread/${ticketId}/${threadNum}`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public loadDraftTicketEmail(
    ticketId: string,
    ticketEmailType: TICKET_EMAIL_TYPE
  ) {
    const url = `${config.serverAddress}/ticket/load/draft/ticket-email/${ticketId}/${ticketEmailType}`;
    return this.http.get(url, this.constructHttpOptions()).toPromise();
  }

  public updateTicketById(id: string, data: Partial<ITicket>) {
    const url = `${config.serverAddress}/ticket/update/${id}`;
    return this.http.put(url, data, this.constructHttpOptions()).toPromise();
  }
}

export interface ILogpageFilter {
  status: string;
  priority: string;
  contactName: string;
  dueDate: any;
  category: string;
  condition: 'AND' | 'OR'
}
