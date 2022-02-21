import { HttpEventType } from "@angular/common/http";
import { Subscription } from "rxjs";
import { ImageUploadService } from "../services/image-upload/image-upload.service";

export class ImageUploadAdapter {

  private subscription: Subscription;
  constructor(private loader: any, private uploadService: ImageUploadService) {}

  upload() {
    return this.loader.file
      .then((file: File) => new Promise((resolve, reject) => {
        this.sendRequest(file, resolve, reject);
      }));
  }

  abort() {
    if(this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private sendRequest(file: File, resolve: Function, reject: Function) {
    const formData = new FormData();
    formData.append('file', file);
    this.subscription = this.uploadService.imageUpload(formData).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
        this.loader.uploadTotal = event.total;
        this.loader.uploaded = event.loaded;
      }
      if(event.type === HttpEventType.Response) {
        resolve({
         default: event.body.path
        });
      }
    },
    (err: Error) => {
      if (err) {
        reject(err.message);
      }
    })
  }
}

