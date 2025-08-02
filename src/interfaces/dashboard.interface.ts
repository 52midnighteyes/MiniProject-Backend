export interface IDateFilterTransaction {
  event_id: string;
  days: number;
}

export interface IDateFilterEOTransaction {
  days: number;
  organizer_id: string;
}

export interface IEventAttenderParams {
  event_id: string;
}

export interface IDateFilterAttenders {
  event_id: string;
  days: number;
}
