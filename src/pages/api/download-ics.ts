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

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\') // Escape backslashes
    .replace(/;/g, '\\;') // Escape semicolons
    .replace(/,/g, '\\,') // Escape commas
    .replace(/\r?\n/g, '\\n') // Escape newlines
}

function foldIcsLine(line: string): string {
  const maxLineLength = 75;
  if (line.length <= maxLineLength) return line;
  const folded = [];
  for (let i = 0; i < line.length; i += maxLineLength) {
    const part = line.slice(i, i + maxLineLength);
    folded.push(i === 0 ? part : ' ' + part);
  }
  return folded.join('\r\n');
}

function generateIcs(event: CalendarEvent): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    foldIcsLine(`SUMMARY:${escapeIcsText(event.title)}`),
    foldIcsLine(`DTSTART:${formatDate(event.start)}`),
    foldIcsLine(`DTEND:${formatDate(event.end)}`),
    foldIcsLine(`DESCRIPTION:${escapeIcsText(event.description || '')}`),
    foldIcsLine(`LOCATION:${escapeIcsText(event.location || '')}`),
    foldIcsLine(`UID:${generateUid(event)}`),
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
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
