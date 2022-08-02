import { MenuCategoryGet } from "src/app/openapi-cli/models";

export class ChangeMenuCategoryEvent {
    public readonly categry: MenuCategoryGet;

    constructor(category: MenuCategoryGet) {
        this.categry = category;
    }
} 