import { MenuHorizontalElement } from "../../../model/menu-horizontal-element";

export class ChangeElementEvent {
    public readonly element: MenuHorizontalElement;

    constructor(element: MenuHorizontalElement) {
        this.element = element;
    }
} 