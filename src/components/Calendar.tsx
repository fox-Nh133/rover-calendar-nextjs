import React, { useEffect, useState, useRef } from 'react';
import SafeHtml from '@/components/SafeHtml';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
}

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
        e =>
        e.id === arg.event.id ||
        (e.title === arg.event.title && e.start === arg.event.startStr)
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
        // headerToolbar={{
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay',
        // }}
        events={events}
        eventClick={handleEventClick}
      />

      {isModalOpen && selectedEvent && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card" id="eventModal">
            <section className="modal-card-body">
              <div className="media">
                <div className="media-content has-text-centered">
                  <strong>{selectedEvent.title}</strong>
                </div>
                <div className="media-right">
                  <button className="delete" aria-label="close" onClick={closeModal}></button>
                </div> 
              </div>
              <div className="columns is-mobile">
                <div className="column is-2 has-text-centered">
                  <div className="icon">
                    <img src="/icons/clock-black.svg"></img>
                  </div>
                </div>
                <div className="column">
                  {new Date(selectedEvent.start).toLocaleString('ja-JP')}
                  <span> - </span>
                  {new Date(selectedEvent.end).toLocaleString('ja-JP')}
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-2 has-text-centered">
                  <div className="icon">
                    <img src="/icons/location-black.svg"></img>
                  </div>
                </div>
                <div className="column">
                  {selectedEvent.location ? selectedEvent.location : '-'}
                </div>
              </div>
              <div className="columns is-mobile">
                <div className="column is-2 has-text-centered">
                  <div className="icon">
                    <img src="/icons/line-attach-file-black.svg"></img>
                  </div>
                </div>
                <div className="column">
                  {selectedEvent.description ? (
                    <SafeHtml html={selectedEvent.description} />
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </section>
            <footer className="modal-card-foot buttons">
                <button
                    className="button is-info"
                    onClick={() => {
                    const { title, start, end, description, location } = selectedEvent;
                    const query = new URLSearchParams({
                        title: title || '',
                        start: start || '',
                        end: end || '',
                        description: description || '',
                        location: location || '',
                    }).toString();

                    // 直接APIエンドポイントに遷移
                    window.location.href = `/api/download-ics?${query}`;
                    }}
                >
                    <p>カレンダーに追加</p>
                    <div className="icon">
                        <img src="/icons/download.svg" alt="Add to Calendar" />
                    </div>
                </button>
                <button className="button" aria-label="close" onClick={closeModal}>
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
