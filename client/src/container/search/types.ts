export enum SegmentType {
  PROSPECT = 'prospect',
  LEAD = 'lead',
  CUSTOMER = 'customer',
  OTHER = 'other',
}

export const segmentTypes = ['prospect', 'lead', 'customer', 'other'];

export interface UserType {
  name: string;
  email: string;
}
