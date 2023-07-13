import { Pipe, PipeTransform } from '@angular/core';
import { CommentStatus } from '../../models';

@Pipe({
  name: 'commentstatus'
})
export class CommentStatusPipe implements PipeTransform {

  transform(value: CommentStatus ): string {
    switch (value) {
      case 'new':
        return 'Status: Neu';
      case 'released':
        return 'Status: Veröffentlicht';
      case 'spam':
        return 'Status: Spam';
      default:
        return 'Papierkorb';
    }
  }

}
