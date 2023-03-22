import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-menu-chief-note',
  templateUrl: './order-menu-chief-note.component.html',
  styleUrls: ['./order-menu-chief-note.component.scss']
})
export class OrderMenuChiefNoteComponent implements OnInit {

  // TODO fix mobile keyboard handling

  _commentable: { comment?: string } | undefined;

  @Input('commentable') set commentable(value: { comment?: string }) {
    this._commentable = value;
    this.value = value.comment ? value.comment : '';
  }

  value = '';

  constructor() { }

  ngOnInit(): void {
  }

  public updateComment(textArea: EventTarget) {
    if (!this._commentable) { throw 'Order not defined'; }

    let value = (textArea as HTMLInputElement).value;
    this._commentable.comment = value;
  }

}
