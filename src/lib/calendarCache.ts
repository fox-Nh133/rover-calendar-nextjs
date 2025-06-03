import { CalendarEvent } from '@/types/CalendarEvent';
import { isEventAllDay } from './dateUtils';
import { CALENDAR_CACHE_MS } from './constants';


let cachedEvents: CalendarEvent[] = [];
let lastFetched = 0;
const CACHE_DURATION = CALENDAR_CACHE_MS;

export async function getCachedCalendarEvents(): Promise<CalendarEvent[]> {
  const now = Date.now();
  if (cachedEvents.length === 0 || now - lastFetched > CACHE_DURATION) {
    const res = await fetch(process.env.ICAL_URL!);
    const icalData = await res.text();

    const ical = await import('ical');
    const parsed = ical.parseICS(icalData);
    const vevents = Object.values(parsed).filter((e: any) => e.type === 'VEVENT');

    cachedEvents = expandRecurringEvents(vevents);
    lastFetched = now;
  }

  return cachedEvents;
}

function expandRecurringEvents(events: any[]): CalendarEvent[] {
  return events.flatMap(event => {
    if (!event.start || isNaN(new Date(event.start).getTime())) {
      console.warn('Skipped invalid event:', event);
      return [];
    }

    const safeStart = new Date(event.start);
    const safeEnd = event.end && !isNaN(new Date(event.end).getTime())
      ? new Date(event.end)
      : new Date(safeStart.getTime() + 24 * 60 * 60 * 1000); // 1日加算

    if (!event.rrule) {
      return [{
        id: event.uid || '',
        title: event.summary || '',
        start: safeStart.toISOString(),
        end: safeEnd.toISOString(),
        description: event.description || '',
        location: event.location || '',
        allDay: isEventAllDay(event),
      }];
    }

    const rrule = event.rrule;
    const untilDate = new Date(rrule.origOptions.until);
    const weekdays = rrule.origOptions.byweekday?.map((day: any) => day.weekday) || [];
    const occurrences: CalendarEvent[] = [];

    let currentDate = new Date(rrule.origOptions.dtstart);

    while (currentDate <= untilDate) {
      if (weekdays.length === 0 || weekdays.includes(currentDate.getUTCDay())) {
        const occurrenceStart = new Date(currentDate);
        occurrenceStart.setUTCHours(safeStart.getUTCHours());
        occurrenceStart.setUTCMinutes(safeStart.getUTCMinutes());
        occurrenceStart.setUTCSeconds(safeStart.getUTCSeconds());

        const occurrenceEnd = new Date(currentDate);
        occurrenceEnd.setUTCHours(safeEnd.getUTCHours());
        occurrenceEnd.setUTCMinutes(safeEnd.getUTCMinutes());
        occurrenceEnd.setUTCSeconds(safeEnd.getUTCSeconds());

        if (occurrenceEnd < occurrenceStart) {
          occurrenceEnd.setUTCDate(occurrenceEnd.getUTCDate() + 1);
        }

        occurrences.push({
          id: `${event.uid || ''}_${occurrenceStart.toISOString()}`,
          title: event.summary || '',
          start: occurrenceStart.toISOString(),
          end: occurrenceEnd.toISOString(),
          description: event.description || '',
          location: event.location || '',
          allDay: isEventAllDay({
            start: occurrenceStart,
            end: occurrenceEnd,
            datetype: {
              start: event.datetype?.start,
              end: event.datetype?.end,
            }
          }),
        });
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return occurrences;
  });
}
