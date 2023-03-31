import { MenuHorizontalElement } from "../../../model/menu-horizontal-element";

export class ChangeElementEvent {
    readonly element: MenuHorizontalElement;

    constructor(element: MenuHorizontalElement) {
        this.element = element;
    }
} 