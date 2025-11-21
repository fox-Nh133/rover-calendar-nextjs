import React, { useEffect, useState, useRef } from 'react';
import { CalendarEvent } from '@/types/CalendarEvent';
import SafeHtml from '@/lib/SafeHtml';
import ThemeResponsiveImage from '@/lib/ThemeResponsiveImage';
import { formatEventTime } from '@/lib/dateUtils';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.scss';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/calendar-events');
        const data = await res.json();

        const formatted = data.map((event: any) => ({
          id: `${event.title}-${event.start}`,
          title: event.title,
          start: event.start,
          end: event.end,
          location: event.location,
          description: event.description,
          allDay: event.allDay,
        }));

        setEvents(formatted);
      } catch (err) {
        console.error('イベントの取得に失敗しました', err);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (arg: { event: any }) => {
    const clickedEvent = events.find(
      e => e.id === arg.event.id || (e.title === arg.event.title && e.start === arg.event.startStr)
    );
    if (clickedEvent) {
      setSelectedEvent(clickedEvent);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        height="auto"
        events={events}
        eventClick={handleEventClick}
      />

      {isModalOpen && selectedEvent && (
        <div className={styles.modal} role="dialog" aria-modal="true">
          <div className={styles.backdrop} onClick={closeModal}></div>
          <div className={styles.modalCard} id="eventModal">
            <section className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <strong className={styles.modalTitle}>{selectedEvent.title}</strong>
                <button
                  className={styles.closeButton}
                  aria-label="close"
                  type="button"
                  onClick={closeModal}
                >
                  ×
                </button>
              </div>
              <div className={styles.detailList}>
                <div className={styles.detailRow}>
                  <div className={styles.detailIcon}>
                    <ThemeResponsiveImage name="clock" className={styles.detailImage} />
                  </div>
                  <div className={styles.detailContent}>
                    <p>
                      {formatEventTime(
                        selectedEvent.start,
                        selectedEvent.end,
                        selectedEvent.allDay ?? false
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailIcon}>
                    <ThemeResponsiveImage name="location" className={styles.detailImage} />
                  </div>
                  <div className={styles.detailContent}>
                    {selectedEvent.location ? (
                      <p>{selectedEvent.location}</p>
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
                    {selectedEvent.description ? (
                      <SafeHtml html={selectedEvent.description} />
                    ) : (
                      <p className={styles.placeholder}>-</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <footer className={styles.modalFooter}>
              <button
                className={`${styles.modalButton} ${styles.primaryButton}`}
                type="button"
                onClick={() => {
                  const { title, start, end, description, location } = selectedEvent;
                  const query = new URLSearchParams({
                    title: title || '',
                    start: start || '',
                    end: end || '',
                    description: description || '',
                    location: location || '',
                  }).toString();

                  window.location.href = `/api/download-ics?${query}`;
                }}
              >
                <span>カレンダーに追加</span>
                <img
                  src="/icons/download.svg"
                  alt="Add to Calendar"
                  className={styles.buttonIcon}
                />
              </button>
              <button
                className={styles.modalButton}
                type="button"
                aria-label="close"
                onClick={closeModal}
              >
                閉じる
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
