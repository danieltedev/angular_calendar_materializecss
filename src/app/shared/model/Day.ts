interface Day {
  day?: number;
  dateFull?: Date;
  events?: Array<EventDay>;
  current?: boolean;
  selected?: boolean;
  disabled?: boolean;
  hours?: Array<HourDay>;
}
