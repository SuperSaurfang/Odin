export class StatusResponse {
  change: ChangeResponse;
  responseType: StatusResponseType;
  message: string;
}

export enum ChangeResponse {
  Change,
  NoChange,
  Error
}

export enum StatusResponseType {
  Create,
  Update,
  Delete
}
