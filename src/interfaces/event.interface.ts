export interface IDateFilterAttenders {
  event_id: string;
}

export interface IEventAttendersStatisticParams {
  event_id: string;
}

export interface IGetEventDetailsById {
  event_id: string;
}

export interface IConfirmEventAttendersParams {
  ticket_code: string;
  organizer_id: string;
}
