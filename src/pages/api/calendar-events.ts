import type { NextApiRequest, NextApiResponse } from 'next';
import ical from 'ical';

const ICAL_URL =
  'https://calendar.google.com/calendar/ical/27368b164f2ff54d4b7f165793fba4d2ef0706b2de617768c8c030ad0500e14c%40group.calendar.google.com/public/basic.ics';

function expandRecurringEvents(events: any[]): any[] {
  return events.flatMap(event => {
    if (!event.start || isNaN(new Date(event.start).getTime())) {
      console.warn('Skipped invalid event:', event);
      return [];
    }

    const safeStart = new Date(event.start);
    const safeEnd = event.end && !isNaN(new Date(event.end).getTime())
      ? new Date(event.end)
      : new Date(safeStart.getTime() + 24 * 60 * 60 * 1000); // add one day for all-day events

    if (!event.rrule) {
      return [{
        uid: event.uid,
        title: event.summary,
        start: safeStart.toISOString(),
        end: safeEnd.toISOString(),
        description: event.description || '',
        location: event.location || '',
      }];
    }

    const rrule = event.rrule;
    const untilDate = new Date(rrule.origOptions.until);
    const weekdays = rrule.origOptions.byweekday?.map((day: any) => day.weekday) || [];
    const occurrences = [];
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
          uid: event.uid,
          title: event.summary,
          start: occurrenceStart.toISOString(),
          end: occurrenceEnd.toISOString(),
          description: event.description || '',
          location: event.location || '',
        });
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return occurrences;
  });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(ICAL_URL);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.text();
    const parsed = ical.parseICS(data);
    const vevents = Object.values(parsed).filter(e => e.type === 'VEVENT');
    const expandedEvents = expandRecurringEvents(vevents);

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600'); // Cache for 1 minute, revalidate after 1 hour
    res.status(200).json(expandedEvents);
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: 'Failed to fetch calendar' });
  }
}
