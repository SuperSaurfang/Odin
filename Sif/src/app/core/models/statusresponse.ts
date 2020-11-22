export class StatusResponse {
  change: ChangeResponse;
  message: string;
}

export enum ChangeResponse {
  Change,
  NoChange,
  Error
}
