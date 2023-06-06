import { IdentifiedByRefData, LinkedMenuItemData, MenuCategoryData, MenuItemData, MenuItemGroupData } from "@common/api-client/models";

export class Trimers { 
    static trimCategoryData(data: MenuCategoryData) : MenuCategoryData {
        return {
            description: data.description,
            icon: this.trimRefData(data.icon),
            name: data.name
        }
    }

    static trimLinkedItem(data: LinkedMenuItemData) : LinkedMenuItemData {
        return {
            allergens: data.allergens.map(e => this.trimRef(e)),
            available: data.available,
            price: data.price,
            selectCollections: data.selectCollections.map(e => this.trimRef(e)),
            toppingCollections: data.toppingCollections.map(e => this.trimRef(e))
        }
    }

    static trimMenuItemData(data: MenuItemData) : MenuItemData {
        return {
            allergens: data.allergens.map(e => this.trimRef(e)),
            available: data.available,
            menuItemGroupRef: data.menuItemGroupRef,
            name: data.name,
            price: data.price,
            selectCollections: data.selectCollections.map(e => this.trimRef(e)),
            toppingCollections: data.toppingCollections.map(e => this.trimRef(e))
        }
    }

    static trimGroupData(data: MenuItemGroupData) : MenuItemGroupData {
        return {
            available: data.available,
            categoryRef: data.categoryRef,
            description: data.description,
            image: this.trimRefData(data.image),
            name: data.name
        }
    }

    static trimRef(data: IdentifiedByRefData) : IdentifiedByRefData {
        return {
            ref: data.ref
        };
    }

    static trimRefData(data: IdentifiedByRefData | undefined) : IdentifiedByRefData | undefined {
        return data ? {
            ref: data.ref
        } : undefined;
    }
}