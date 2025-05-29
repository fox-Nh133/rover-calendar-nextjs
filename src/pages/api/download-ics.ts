import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title = 'イベント', start, end, description = '', location = '' } = req.query;

  if (!start || !end) {
    res.status(400).send('Missing required parameters');
    return;
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
      d.getUTCFullYear() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      pad(d.getUTCSeconds()) +
      'Z'
    );
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${formatDate(start.toString())}
DTEND:${formatDate(end.toString())}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader('Content-Disposition', 'inline; filename="event.ics"');
  res.status(200).send(icsContent);
}
