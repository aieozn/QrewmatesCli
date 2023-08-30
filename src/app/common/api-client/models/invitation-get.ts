/* tslint:disable */
/* eslint-disable */
export interface InvitationGet {
  email: string;
  issued: string;
  ref: string;
  role: 'ROOT' | 'OWNER' | 'ADMIN' | 'STAFF';
}
