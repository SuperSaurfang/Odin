/**
 * @deprecated
 */
export class Message {
  messageType: MessageType;
  messageContent: string;
}

/**
 * @deprecated
 */
export enum MessageType {
  Error,
  Warning,
  Info,
  Ok,
}
