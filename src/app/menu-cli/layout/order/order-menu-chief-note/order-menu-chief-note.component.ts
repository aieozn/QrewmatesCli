import { Component, Input, OnInit } from '@angular/core';
import { OrderElementDataWrapper } from 'src/app/openapi-cli-wrapper/order/order-element-data-wrapper';

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
    console.log(value);
    this.commentable.comment = value;
  }

}
