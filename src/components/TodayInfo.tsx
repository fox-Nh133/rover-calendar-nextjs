import React, { useEffect, useState } from 'react';
import { CalendarEvent } from '@/types/CalendarEvent';
import { formatEventTime } from '@/lib/dateUtils';
import styles from './TodayInfo.module.scss';
import ThemeResponsiveImage from './ThemeResponsiveImage';

const TodayInfo: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [closestEvent, setClosestEvent] = useState<CalendarEvent | null>(null);
  const [closestEventTime, setClosestEventTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
      month: 'long',
      day: 'numeric',
    });
    const dayFormatter = new Intl.DateTimeFormat('ja-JP', { weekday: 'long' });

    setCurrentDate(dateFormatter.format(now));
    setCurrentDay(dayFormatter.format(now));

    const fetchClosestEvent = async () => {
      try {
        const res = await fetch('/api/calendar-events');
        if (!res.ok) throw new Error('failed to fetch events');
        const data: CalendarEvent[] = await res.json();
        if (!Array.isArray(data)) return;

        const nowTime = Date.now();
        const sorted = data
          .map(event => ({ event, startTime: new Date(event.start).getTime() }))
          .filter(({ startTime }) => !Number.isNaN(startTime))
          .sort((a, b) => a.startTime - b.startTime);

        const future = sorted.find(({ startTime }) => startTime >= nowTime);
        const target = future ?? sorted[sorted.length - 1];

        if (target) {
          setClosestEvent(target.event);
          setClosestEventTime(
            formatEventTime(target.event.start, target.event.end, target.event.allDay ?? false)
          );
        }
      } catch (error) {
        console.error('直近のイベント取得に失敗しました', error);
      }
    };

    fetchClosestEvent();
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <h1 className={styles.date} id="currentDate">
          {currentDate || 'current date'}
        </h1>
        <p className={styles.day} id="currentDay">
          {currentDay || 'current day'}
        </p>
      </div>
      <hr className={styles.divider} />
      <p className={styles.sectionTitle} id="closestEvent">
        直近のイベント
      </p>
      <div className={styles.eventBlock}>
        {closestEvent ? (
          <>
            <strong className={styles.eventTitle} id="closestEventTitle">
              {closestEvent.title || 'タイトル未設定'}
            </strong>
            <p className={styles.eventTime}>{closestEventTime}</p>
          </>
        ) : (
          <p className={styles.emptyMessage} id="closestEventTitle">
            イベント情報を取得できませんでした
          </p>
        )}
      </div>
      <div className={styles.detailList}>
        <div className={styles.detailRow}>
          <ThemeResponsiveImage name="clock" className={styles.detailImage} />
        </div>
        <div className={styles.detatilContent}>
          <p>
            {}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TodayInfo;
