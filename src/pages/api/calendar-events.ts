import type { NextApiRequest, NextApiResponse } from 'next';
import { getCachedCalendarEvents } from '@/lib/calendarCache';
import { CALENDAR_CACHE_SECONDS } from '@/lib/constants';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const expandedEvents = await getCachedCalendarEvents();
  res.setHeader('Cache-Control', `s-maxage=${CALENDAR_CACHE_SECONDS}, stale-while-revalidate=3600`); // Cache for 1 minute, revalidate after 1 hour
  res.status(200).json(expandedEvents);

  // try {
  //   const response = await fetch(ICAL_URL);
  //   if (!response.ok) {
  //     throw new Error(`Fetch failed with status ${response.status}`);
  //   }

  //   const data = await response.text();
  //   const parsed = ical.parseICS(data);
  //   const vevents = Object.values(parsed).filter(e => e.type === 'VEVENT');
  //   const expandedEvents = expandRecurringEvents(vevents);

  //   res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600'); // Cache for 1 minute, revalidate after 1 hour
  //   res.status(200).json(expandedEvents);
  // } catch (error) {
  //   console.error('Error fetching calendar:', error);
  //   res.status(500).json({ error: 'Failed to fetch calendar' });
  // }
}
