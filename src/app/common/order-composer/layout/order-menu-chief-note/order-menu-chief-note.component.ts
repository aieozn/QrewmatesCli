import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-menu-chief-note',
  templateUrl: './order-menu-chief-note.component.html',
  styleUrls: ['./order-menu-chief-note.component.scss']
})
export class OrderMenuChiefNoteComponent {

  // TODO fix mobile keyboard handling

  _commentable: { comment?: string } | undefined;

  @Input('commentable') set commentable(value: { comment?: string }) {
    this._commentable = value;
    this.value = value.comment ? value.comment : '';
  }

  value = '';

  updateComment(textArea: EventTarget) {
    if (!this._commentable) { throw 'Order not defined'; }

    const value = (textArea as HTMLInputElement).value;
    this._commentable.comment = value;
  }

}
