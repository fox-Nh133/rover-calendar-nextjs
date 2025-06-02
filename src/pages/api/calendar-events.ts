import type { NextApiRequest, NextApiResponse } from 'next';
import { getCachedCalendarEvents } from '@/lib/calendarCache';
import { CALENDAR_CACHE_SECONDS } from '@/lib/constants';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const expandedEvents = await getCachedCalendarEvents();
  res.setHeader('Cache-Control', `s-maxage=${CALENDAR_CACHE_SECONDS}, stale-while-revalidate=3600`); // Cache for 1 minute, revalidate after 1 hour
  res.status(200).json(expandedEvents);
}
