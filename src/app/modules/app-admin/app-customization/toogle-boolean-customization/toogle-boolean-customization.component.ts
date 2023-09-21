import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toogle-boolean-customization',
  templateUrl: './toogle-boolean-customization.component.html',
  styleUrls: ['../customization-component.scss']
})
export class ToogleBooleanCustomizationComponent {

  @Input() header = '';
  @Input() value = false;

  @Output('toogle')
  toogleEmitter = new EventEmitter<boolean>();

  toogle(value: boolean) {
    this.toogleEmitter.emit(value);
  }
}
