export class CalendarUtils {
    static monthNumberToName(num: number) {
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

    static monthNumberToLocative(num: number) {
        switch(num) {
            case 1:
                return $localize`:@@LOCATIVE-JENUARY:Jenuary`;
            case 2:
                return $localize`:@@LOCATIVE-FEBRUARY:February`;
            case 3:
                return $localize`:@@LOCATIVE-MARCH:March`;
            case 4:
                return $localize`:@@LOCATIVE-APRIL:April`;
            case 5:
                return $localize`:@@LOCATIVE-MAY:May`;
            case 6:
                return $localize`:@@LOCATIVE-JUNE:June`;
            case 7:
                return $localize`:@@LOCATIVE-JULY:July`;
            case 8:
                return $localize`:@@LOCATIVE-AUGUST:Augist`;
            case 9:
                return $localize`:@@LOCATIVE-SEPTEMBER:September`;
            case 10:
                return $localize`:@@LOCATIVE-OCTOBER:October`;
            case 11:
                return $localize`:@@LOCATIVE-NOVEMBER:November`;
            case 12:
                return $localize`:@@LOCATIVE-DECEMBER:Devember`;
            default:
                throw 'Month not found';
        }
    }
}