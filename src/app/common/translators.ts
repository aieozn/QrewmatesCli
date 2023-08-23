export class Translators {
    public static translatePaymentMethod(method: PaymentMethod) {
        switch(method) {
            case 'CASH': return $localize`Cash`
            case 'BLIK': return $localize`Blik`
        }
    }

    public static translatePaymentStatus(method: PaymentStatus) {
        switch(method) {
            case 'UNPAID': return $localize`Not paid yet`
            case 'PAID': return $localize`Already paid`
            case 'RETURNED': return $localize`Order has been returned`
            case 'WITHDRAWN': return $localize`Order has been returned`
        }
    }

    public static translateOrderStatus(method: OrderStatus) {
        switch(method) {
            case 'PLACED': return $localize`Placed`
            case 'EXPIRED': return $localize`Expired`
            case 'ABANDONED': return $localize`Abandoned`
            case 'REJECTED': return $localize`Rejected`
            case 'ACCEPTED': return $localize`Accepted`
            case 'CANCELED': return $localize`Canceled`
            case 'SERVED': return $localize`Served`
        }
    }
}

export type OrderStatus = 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
export type PaymentMethod = 'CASH' | 'BLIK';