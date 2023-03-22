export class CalendarUtils {
    public static monthNumberToName(num: number) {
        switch(num) {
            case 1:
                return $localize`Jenuary`;
            case 2:
                return $localize`February`;
            case 3:
                return $localize`March`;
            case 4:
                return $localize`April`;
            case 5:
                return $localize`May`;
            case 6:
                return $localize`June`;
            case 7:
                return $localize`July`;
            case 8:
                return $localize`Augist`;
            case 9:
                return $localize`September`;
            case 10:
                return $localize`October`;
            case 11:
                return $localize`November`;
            case 12:
                return $localize`Devember`;
            default:
                throw 'Month not found';
        }
    }

    public static monthNumberToLocative(num: number) {
        switch(num) {
            case 1:
                return $localize`Jenuary`;
            case 2:
                return $localize`February`;
            case 3:
                return $localize`March`;
            case 4:
                return $localize`April`;
            case 5:
                return $localize`May`;
            case 6:
                return $localize`June`;
            case 7:
                return $localize`July`;
            case 8:
                return $localize`Augist`;
            case 9:
                return $localize`September`;
            case 10:
                return $localize`October`;
            case 11:
                return $localize`November`;
            case 12:
                return $localize`Devember`;
            default:
                throw 'Month not found';
        }
    }
}