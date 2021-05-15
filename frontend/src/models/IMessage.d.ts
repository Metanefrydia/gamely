export type IMsgType =
  | 'connection'
  | 'message'
  | 'join'
  | 'leave'
  | 'available'
  | 'getMembers';
export interface IMsg {
  type: IMsgType;
  message: string;
  id: string;
}
