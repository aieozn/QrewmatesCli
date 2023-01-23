export interface UpdateOrderStatusMessage {
    orderAction: ('ACCEPT' | 'PAY_OFFLINE' | 'SERVE' | 'REJECT' | 'CANCEL'),
    comment: string | undefined
}