import type { NextApiRequest, NextApiResponse } from 'next';
import { getCachedCalendarEvents } from '@/lib/calendarCache';
import { CalendarEvent } from '@/types/CalendarEvent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, start } = req.query;

  if (!title || !start || typeof title !== 'string' || typeof start !== 'string') {
    res.status(400).send('Missing or invalid query parameters');
    return;
  }

  const events: CalendarEvent[] = await getCachedCalendarEvents();

  const match = events.find(event =>
    event.title === title &&
    new Date(event.start).toISOString() === new Date(start).toISOString()
  );

  if (!match) {
    res.status(404).send('Event not found');
    return;
  }

  const icsContent = generateIcs(match);

  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader('Content-Disposition', `inline; filename="${sanitizeFileName(match.title)}.ics"`);
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');

  res.status(200).send(icsContent);
}

function generateIcs(event: CalendarEvent): string {
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
UID:${generateUid(event)}
END:VEVENT
END:VCALENDAR`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) + 'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) + 'Z'
  );
}

function generateUid(event: CalendarEvent): string {
  return `${Buffer.from(event.title).toString('base64')}-${new Date(event.start).getTime()}@rover-calendar`;
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^\w\-]+/g, '_');
}
