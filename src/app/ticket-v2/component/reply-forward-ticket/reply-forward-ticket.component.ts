import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IAttachment,
  IInlineImg,
  ITicket,
  ITicketEmail,
  ITicketReplyAttachments,
  ITicketReplyData,
  TICKET_EMAIL_TYPE,
} from 'app/ticket-v2/ticket.model';
import { TicketService } from 'app/ticket/ticket.service';
import { NotificationService } from 'app/utils/notification.service';
import { isEmpty } from 'lodash';
import * as shortid from 'shortid';

@Component({
  selector: 'app-reply-forward-ticket',
  templateUrl: './reply-forward-ticket.component.html',
  styleUrls: ['./reply-forward-ticket.component.scss'],
})
export class ReplyForwardTicketComponent implements OnInit {
  @ViewChild('fileUpload', { static: true })
  fileUpload: any;
  @Output() close = new EventEmitter<any>();
  @Output() afterSaveAsDraft = new EventEmitter<any>();
  @Output() afterReplyForward = new EventEmitter<any>();

  @Input() ticket: ITicket;
  @Input() type: TICKET_EMAIL_TYPE;
  @Input() draftEmailId: string = null;

  public body: string = '';

  public fromAddress: Array<string> = ['kartick.dey1995@gmail.com'];
  public toAddress: Array<string> = [];
  public ccAddress: Array<string> = [];
  public bccAddress: Array<string> = [];
  public openAttachDlg: boolean = false;
  public attachmentCount: number = 0;
  public uploadedFiles: Array<ITicketReplyAttachments> = [];
  public draftReply: ITicketEmail = null;
  public isLoading: boolean = false;
  public isEditMode: boolean = false;

  constructor(
    private ticketSvc: TicketService,
    private notiSvc: NotificationService
  ) {}

  async ngOnInit() {
    await this.loadReplyTicketData();
  }

  private async loadReplyTicketData() {
    try {
      this.isLoading = true;
      if (this.draftEmailId) {
        this.draftReply = await this.loadDraftTktEmailById(this.draftEmailId);
      }
      if (isEmpty(this.draftReply)) {
        const ticketEmail: ITicketEmail = await this.loadTicketEmailByThread();
        if (!isEmpty(ticketEmail)) {
          this.autoPopulate(ticketEmail);
        }
      } else {
        this.autoPopulate(this.draftReply);
      }
    } catch (error) {
      console.error('Error: [ngOnInit]', error);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadDraftTktEmailById(tktEmailId: string) {
    try {
      const resp: any = await this.ticketSvc.loadDraftTicketEmailById(
        tktEmailId
      );
      if (resp.success) {
        return resp.ticketEmail || null;
      }
      return null;
    } catch (error) {
      console.error('Error: [loadDraftReply]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private async loadTicketEmailByThread() {
    try {
      const resp: any = await this.ticketSvc.loadTicketEmailByThread(
        this.ticket._id,
        1
      );
      if (resp.success) {
        return resp.ticketEmail || null;
      }
      return null;
    } catch (error) {
      console.error('Error: [loadTicketEmailByThread]', error);
      this.notiSvc.showIfError(error);
    }
  }

  private populateAddress(emailTicket: ITicketEmail) {
    try {
      if (this.draftReply?._id || this.type === 'Reply') {
        this.toAddress = this.draftReply?._id
          ? emailTicket.to.map((e) => e.address)
          : emailTicket.from.map((e) => e.address);
        this.ccAddress = emailTicket.cc.map((e) => e.address);
        this.bccAddress = emailTicket.bcc.map((e) => e.address);
      }
    } catch (error) {
      throw error;
    }
  }

  private populateAttachments(attachment: Array<IAttachment>) {
    try {
      this.uploadedFiles = attachment.map((el) => {
        const att: ITicketReplyAttachments = {
          _id: el._id,
          name: el.name,
          contentType: el.contentType,
          path: el.path,
        };
        return att;
      });
    } catch (error) {
      throw error;
    }
  }

  private autoPopulate(emailTicket: ITicketEmail) {
    try {
      this.populateAddress(emailTicket);
      if (!isEmpty(this.draftReply)) {
        this.body = this.draftReply.text;
        this.populateAttachments(this.draftReply.attachments);
      }
    } catch (error) {
      console.error('Error: [autoPopulate]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public async onSendReply() {
    try {
      this.isLoading = true;
      const payload: ITicketReplyData = this.contructReplyTicketData();
      payload.draft = false;
      await this.replyTicket(payload);
      this.afterReplyForward.emit();
    } catch (error) {
      console.error('Error: [onSendReply]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
    this.close.emit();
  }

  public async onSaveAsDraft() {
    try {
      this.isLoading = true;
      const payload: ITicketReplyData = this.contructReplyTicketData();
      payload.draft = true;
      await this.replyTicket(payload);
      this.afterSaveAsDraft.emit();
    } catch (error) {
      console.error('Error: [onSaveAsDraft]', error);
      this.notiSvc.showIfError(error);
    } finally {
      this.isLoading = false;
    }
  }

  public onCancel() {
    this.close.emit();
  }

  private async replyTicket(payload: ITicketReplyData) {
    try {
      if (this.draftReply?._id) {
        payload._id = this.draftReply._id;
      }
      const resp: any = await this.ticketSvc.replyTicket(payload);
      if (resp.success) {
        this.notiSvc.success(resp.message, 'Ticket Reply');
      }
    } catch (error) {
      throw error;
    }
  }

  private getStringBetween(
    str: string,
    startStr: string,
    endStr: string
  ): string {
    try {
      const result = str.match(new RegExp(startStr + '(.*)' + endStr));
      return result?.length > 1 ? result[1] : null;
    } catch (error) {
      console.error('Error: [getStringBetween]', error);
      throw error;
    }
  }

  private getInlineImgDetails(text: string) {
    try {
      const contentType = this.getStringBetween(text, 'data:', ';');
      const contentDisposition = 'inline';
      const encoding = this.getStringBetween(text, ';', ',');
      const content = this.getStringBetween(text, 'base64,', '');
      const cid = shortid.generate();
      const fileExtension = this.getStringBetween(text, 'image/', ';');
      const filename = `${cid}.${fileExtension}`;
      return {
        filename,
        content,
        contentType,
        cid,
        encoding,
        contentDisposition,
      };
    } catch (error) {
      console.error('Error: [getInlineImgDetails]', error);
      throw error;
    }
  }

  private generateEmailInlineImage(content: string) {
    try {
      const div = document.createElement('div');
      div.setAttribute('style', 'display: none');
      div.innerHTML = content;
      const imgTags = div.getElementsByTagName('img');
      const inlineImgDetails: Array<IInlineImg> = [];
      if (imgTags.length > 0) {
        Array.from(imgTags).forEach((img) => {
          const inlineImgData = this.getInlineImgDetails(img.src);
          console.log('inlineImgData:', inlineImgData);
          img.src = `cid:${inlineImgData.cid}`;
          inlineImgDetails.push(inlineImgData);
        });
      }
      const emailHtml = div.innerHTML;
      return { emailHtml, inlineImgDetails };
    } catch (error) {
      console.error('Error: [generateEmailInlineImage]', error);
      throw error;
    }
  }

  private contructReplyTicketData() {
    try {
      const { emailHtml, inlineImgDetails } = this.generateEmailInlineImage(
        this.body
      );
      const ticketReply: ITicketReplyData = {
        ticketId: this.ticket._id,
        content: this.body,
        ticketEmailType: this.type,
        from: this.fromAddress,
        to: this.toAddress,
        cc: this.ccAddress,
        bcc: this.bccAddress,
        attachments: this.uploadedFiles,
        senderName: 'SITE-ADMIN',
        senderEmail: 'siteadmin@example.com',
        recipientEmail: this.toAddress[0],
        recipientName: this.toAddress[0].match(/^(.+)@/)[1],
        emailHtml: emailHtml,
        inlineImgDetails: inlineImgDetails,
      };
      return ticketReply;
    } catch (error) {
      throw error;
    }
  }

  public openAttachmentDialog() {
    this.openAttachDlg = true;
  }

  public onClosedAttachDlg() {
    this.openAttachDlg = false;
  }

  public async uploadFile(files: Array<any>) {
    try {
      for (let i = 0; i < files.length; i++) {
        const fileResp: any = await this.ticketSvc.uploadFiles(
          files[i],
          this.ticket._id
        );
        if (fileResp.success) {
          if (fileResp.file?._id) {
            this.uploadedFiles.push({
              _id: fileResp.file._id,
              name: fileResp.file.name,
              contentType: fileResp.file.contentType,
              path: fileResp.file.path,
            });
          }
        }
      }
      this.notiSvc.success('Files are uploaded successfully', 'File Upload');
      this.fileUpload.clear();
      this.openAttachDlg = false;
    } catch (error) {
      console.error('Error: [uploadFile]', error);
      this.notiSvc.showIfError(error);
    }
  }

  public async downloadFile(file: ITicketReplyAttachments) {
    await this.ticketSvc.downloadFile(file._id, file.name);
  }
}
