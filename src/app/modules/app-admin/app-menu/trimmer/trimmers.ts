import { IdentifiedByRefData, MenuCategoryData } from "@common/api-client/models";

export class Trimers { 
    static trimCategoryData(data: MenuCategoryData) : MenuCategoryData {
        return {
            description: data.description,
            icon: this.trimRefData(data.icon),
            name: data.name
        }
    }

    static trimRefData(data: IdentifiedByRefData | undefined) : IdentifiedByRefData | undefined {
        return data ? {
            ref: data.ref
        } : undefined;
    }
}