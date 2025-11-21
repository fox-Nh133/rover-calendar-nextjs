import React, { useEffect, useState } from 'react';
import { CalendarEvent } from '@/types/CalendarEvent';
import { formatEventTime } from '@/lib/dateUtils';
import styles from './TodayInfo.module.scss';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import SafeHtml from '@/lib/SafeHtml';

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
        const events: CalendarEvent[] = await res.json();
        if (!Array.isArray(events)) return;

        const nowTime = Date.now();
        const sorted = events
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
      <div className={styles.eventBody}>
        {closestEvent ? (
          <>
            <div className={styles.eventHeader}>
              <strong className={styles.eventTitle} id="closestEventTitle">
                {closestEvent.title || 'タイトル未設定'}
              </strong>
            </div>
            <div className={styles.detailList}>
              <div className={styles.detailRow}>
                <div className={styles.detailIcon}>
                  <ThemeResponsiveImage name="clock" className={styles.detailImage} />
                </div>
                <div className={styles.detatilContent}>
                  <p id="closestEventTime">{closestEventTime}</p>
                </div>
              </div>
                  <div className={styles.detailRow}>
                    <div className={styles.detailIcon}>
                      <ThemeResponsiveImage name="location" className={styles.detailImage} />
                    </div>
                    <div className={styles.detailContent}>
                      {closestEvent.location ? (
                        <p>{closestEvent.location}</p>
                      ) : (
                        <p className={styles.placeholder}>-</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.detailRow}>
                    <div className={styles.detailIcon}>
                      <ThemeResponsiveImage name="line-attach-file" className={styles.detailImage} />
                    </div>
                    <div className={styles.detailContent}>
                      {closestEvent.description ? (
                        <SafeHtml html={closestEvent.description} />
                      ) : (
                        <p className={styles.placeholder}>-</p>
                      )}
                    </div>
                  </div>
            </div>
          </>
        ) : (
          <p className={styles.emptyMessage} id="closestEventTitle">
            イベント情報を取得できませんでした
          </p>
        )}
      </div>
    </section>
  );
};

export default TodayInfo;
