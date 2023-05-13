export interface ITicket {
  _id: string;
  checked: boolean;
  hover: boolean;
  ticketNumber: number;
  ticketOwner: string;
  contactName: string;
  contactEmail: string;
  subject: string;
  threadCount: number;
  status: string;
  seen: boolean;
  dueDate: any;
  draft: boolean;
  replyed: boolean;
  createdAt: any;
  envID: string;
  ticketID: string;
  priority?: string;
  resolution?: string;
  classifications?: string;
  category?: string;
  subCategory?: string;
  sites?: string;
  company?: string;
  bugType?: string;
  channel: string;
  technicalTeamAssistanceNeeded?: string;
  description?: string;
}

export interface ITicketReplyAttachments {
  _id: string;
  name: string;
  contentType: string;
  path: string;
}

export interface ITicketReplyData {
  _id?: string;
  ticketId: string;
  from: Array<string>;
  to: Array<string>;
  cc: Array<string>;
  bcc: Array<string>;
  content: string;
  attachments: Array<ITicketReplyAttachments>;
  draft?: boolean;
  ticketEmailType: TICKET_EMAIL_TYPE;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  emailHtml: string,
  inlineImgDetails: Array<IInlineImg>
}

export interface IInlineImg {
  filename: string;
  content: any;
  contentType: string;
  cid: string;
  encoding: string;
  contentDisposition: string;
}

export interface ITicketEmail {
  _id: string;
  ticketObjId?: string;
  envID?: string;
  isDeleted?: boolean;
  thread?: number;
  html: string;
  text: string;
  headers: IEmailHeader;
  subject: string;
  messageId: string;
  priority: string;
  from: Array<IEmailAddress>;
  to: Array<IEmailAddress>;
  cc?: Array<IEmailAddress>;
  bcc?: Array<IEmailAddress>;
  date: string;
  receivedDate: string;
  uid: string;
  flags: string;
  attachments?: Array<IAttachment>;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  expand?: boolean;
}

interface IEmailHeader {
  from: string;
  date: string;
  subject: string;
  to: string;
  cc: string;
}

export interface IEmailAddress {
  address: string;
  name: string;
}

export interface IAttachment {
  _id?: string;
  envID?: string;
  name: string;
  contentType: string;
  size?: number;
  path?: string;
  content?: any;
}

export type TICKET_EMAIL_TYPE = 'Ticket' | 'Reply' | 'Forward';
