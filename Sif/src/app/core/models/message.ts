export class Message {
  messageType: MessageType;
  messageContent: string;
}

export enum MessageType {
  Error,
  Warning,
  Info,
  Ok,
}
