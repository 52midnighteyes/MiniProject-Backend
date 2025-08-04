export interface ICreateTransactionParam {
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

export interface IGetEventTransactionParams {
  event_id: string;
}

export interface IGetRevenueQueryParams {
  event_id: string;
  days: number;
}

export interface IGetTransacionByUserIdParams {
  user_id: string;
}

export interface IGetEventRevenueByDateParams {
  event_id: string;
  days: number;
}

export interface IGetEORevenueByDateServiceParams {
  days: number;
  organizer_id: string;
}
