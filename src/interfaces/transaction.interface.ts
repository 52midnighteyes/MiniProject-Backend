export interface ITransactionParam {
  user_id: string;
  event_id: string;
  tickets: { id: string; holder_name: string; holder_email: string }[];
  coupon: {
    id: string;
  };
  voucher: {
    code: string;
    event_id: string;
  };
  points: { id: string; points_amount: number; is_used: boolean }[];
}

export interface IGetAllTranscationByUserIdParams {
  user_id: string;
}

export interface IGetAllTranscationByEventIdParams {
  event_id: string;
}

export interface IGetRevenueByDateParams {
  event_id: string;
  days: number;
}
