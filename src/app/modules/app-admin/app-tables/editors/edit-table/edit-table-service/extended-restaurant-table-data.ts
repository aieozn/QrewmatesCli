import { QrCodeGet } from "@common/api-client/models";

export interface ExtendedRestaurantTableData {
    name: string;
    posX: number;
    posY: number;
    qrCode: QrCodeGet | undefined;
}