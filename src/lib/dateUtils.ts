interface EventLike {
  start: Date;
  end: Date;
  datetype?: {
    start?: string;
    end?: string;
  };
}

export function isEventAllDay(event: EventLike): boolean {
  const { start, end, datetype } = event;

  const isDateType = datetype?.start === 'date' || datetype?.end === 'date';

  const isStartMidnightUTC = start.getUTCHours() === 0 &&
    start.getUTCMinutes() === 0 &&
    start.getUTCSeconds() === 0;

  const isEndMidnightUTC = end.getUTCHours() === 0 &&
    end.getUTCMinutes() === 0 &&
    end.getUTCSeconds() === 0;

  const durationMs = end.getTime() - start.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  return isDateType || (isStartMidnightUTC && isEndMidnightUTC && durationMs % oneDayMs === 0);
}


export const formatEventTime = (
  startStr: string,
  endStr: string,
  allDay: boolean = false
): string => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const sameDay = start.toDateString() === end.toDateString();
  const sameMonth = start.getMonth() === end.getMonth();

  const formatDate = (d: Date, showMonth = true) =>
    showMonth ? `${d.getMonth() + 1}月${d.getDate()}日` : `${d.getDate()}日`;

  const formatTime = (d: Date) =>
    d.toTimeString().slice(0, 5); // "HH:MM"

  if (allDay) {
    if (sameDay) {
      return formatDate(start);
    } else {
      return `${formatDate(start)} - ${formatDate(end, !sameMonth)}`;
    }
  } else {
    if (sameDay) {
      return `${formatDate(start)} ${formatTime(start)} - ${formatTime(end)}`;
    } else {
      return `${formatDate(start)} ${formatTime(start)} - ${formatDate(end, !sameMonth)} ${formatTime(end)}`;
    }
  }
};