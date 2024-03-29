export class StatusResponse<TModel> {
  change: ChangeResponse;
  responseType: StatusResponseType;
  model: TModel;
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
