/* tslint:disable */
/* eslint-disable */
export interface OrderActionData {
  comment?: string;
  orderAction: 'CREATE' | 'EXPIRE' | 'REJECT' | 'ABANDON' | 'ACCEPT' | 'MODIFY' | 'CANCEL' | 'SERVE' | 'DELETE' | 'PAY_OFFLINE' | 'PAY_ONLINE' | 'RETURN' | 'WITHDRAW';
}
