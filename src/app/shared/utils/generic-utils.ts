export class GenericUtils {
    public static getMultimediaUrl(restaurantRef: string, ref: string) {
        return `/api/public/v1/restaurant/${restaurantRef}/multimedia/${ref}`;
    }
}