export class Notification {
  status: Status;
  message: string;
  date: Date;
}

export enum Status {
  Error,
  Warning,
  Info,
  Ok,
}
