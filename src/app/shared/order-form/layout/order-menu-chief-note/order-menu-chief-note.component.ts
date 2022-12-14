import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-menu-chief-note',
  templateUrl: './order-menu-chief-note.component.html',
  styleUrls: ['./order-menu-chief-note.component.scss']
})
export class OrderMenuChiefNoteComponent implements OnInit {

  // TODO fix mobile keyboard handling

  @Input('commentable') commentable: { comment?: string } | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public updateComment(textArea: EventTarget) {
    if (!this.commentable) { throw 'Order not defined'; }

    let value = (textArea as HTMLInputElement).value;
    this.commentable.comment = value;
  }

}
