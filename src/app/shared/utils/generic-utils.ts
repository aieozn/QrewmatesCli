export class GenericUtils {
    public static getMultimediaUrl(restaurantRef: string, ref: string) {
        return  "/api/multimedia/" + restaurantRef + "/" + ref;
    }
}