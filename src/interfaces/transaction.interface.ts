export interface ITransactionParam {
  user_id: string;
  event_id: string;
  tickets: { id: string; holder_name: string }[];
  coupon: {
    id: string;
  };
  voucher: {
    code: string;
    event_id: string;
  };
  points: { id: string; points_amount: number; is_used: boolean }[];
}

export interface IGetAllTranscationByUserId {
  user_id: string;
}

export interface IGetAllTranscationByEventId {
  event_id: string;
}

export interface IGetAllTransactionByEventId {}
