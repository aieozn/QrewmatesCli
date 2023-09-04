export class Translators {
    public static translatePaymentMethod(method: PaymentMethod) {
        switch(method) {
            case 'CASH': return $localize`Cash`
            case 'BLIK': return $localize`Blik`
        }
    }

    public static translatePaymentStatus(method: PaymentStatus) {
        // Keep it short to use in status line component
        switch(method) {
            case 'UNPAID': return $localize`Not paid yet`
            case 'PAID': return $localize`Paid`
            case 'RETURNED': return $localize`Returned to client`
            case 'WITHDRAWN': return $localize`Withdrawn`
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

    public static translateRole(method: Role) {
        switch(method) {
            case 'ROOT': return $localize`Root`
            case 'OWNER': return $localize`Owner`
            case 'ADMIN': return $localize`Admin`
            case 'STAFF': return $localize`Staff`
        }
    }
}

export type OrderStatus = 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
export type PaymentMethod = 'CASH' | 'BLIK';
export type UserAction = 'ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL';
export type Role = "ROOT" | "OWNER" | "ADMIN" | "STAFF";