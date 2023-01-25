export class CalendarUtils {
    public static monthNumberToName(num: number) {
        switch(num) {
            case 1:
                return 'Styczeń';
            case 2:
                return 'Luty';
            case 3:
                return 'Marzec';
            case 4:
                return 'Kwiecień';
            case 5:
                return 'Maj';
            case 6:
                return 'Czerwiec';
            case 7:
                return 'Lipiec';
            case 8:
                return 'Sierpień';
            case 9:
                return 'Wrzesień';
            case 10:
                return 'Październik';
            case 11:
                return 'Listopad';
            case 12:
                return 'Grudzień';
            default:
                throw 'Month not found';
        }
    }

    public static monthNumberToMiejscownik(num: number) {
        switch(num) {
            case 1:
                return 'Styczniu';
            case 2:
                return 'Lutym';
            case 3:
                return 'Marcu';
            case 4:
                return 'Kwietniu';
            case 5:
                return 'Maju';
            case 6:
                return 'Czerwcu';
            case 7:
                return 'Lipcu';
            case 8:
                return 'Sierpniu';
            case 9:
                return 'Wrzesniu';
            case 10:
                return 'Październiku';
            case 11:
                return 'Listopadzie';
            case 12:
                return 'Grudniu';
            default:
                throw 'Month not found';
        }
    }
}