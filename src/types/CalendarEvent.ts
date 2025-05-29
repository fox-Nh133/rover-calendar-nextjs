export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
}
export interface CalendarEventWithRRule extends CalendarEvent {
  rrule?: string;
  uid?: string;
}