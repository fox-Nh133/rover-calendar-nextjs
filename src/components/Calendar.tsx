import React, { useEffect, useState, useRef } from 'react';
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

//   const downloadIcs = (event: CalendarEvent) => {
//     const pad = (n: number) => n.toString().padStart(2, '0');
//     const formatDate = (isoString: string) => {
//       const d = new Date(isoString);
//       return (
//         d.getUTCFullYear().toString() +
//         pad(d.getUTCMonth() + 1) +
//         pad(d.getUTCDate()) + 'T' +
//         pad(d.getUTCHours()) +
//         pad(d.getUTCMinutes()) +
//         pad(d.getUTCSeconds()) + 'Z'
//       );
//     };

//     const icsContent = `BEGIN:VCALENDAR
// VERSION:2.0
// BEGIN:VEVENT
// SUMMARY:${event.title}
// DTSTART:${formatDate(event.start)}
// DTEND:${formatDate(event.end)}
// DESCRIPTION:${event.description || ''}
// LOCATION:${event.location || ''}
// END:VEVENT
// END:VCALENDAR`;

//     const blob = new Blob([icsContent], { type: 'text/calendar' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${event.title || 'event'}.ics`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };



  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick}
      />

      {isModalOpen && selectedEvent && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{selectedEvent.title}</p>
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              <p>
                <strong>開始:</strong>{' '}
                {new Date(selectedEvent.start).toLocaleString('ja-JP')}
              </p>
              <p>
                <strong>終了:</strong>{' '}
                {new Date(selectedEvent.end).toLocaleString('ja-JP')}
              </p>
              {selectedEvent.location && (
                <p>
                  <strong>場所:</strong> {selectedEvent.location}
                </p>
              )}
              {selectedEvent.description && (
                <p>
                  <strong>説明:</strong> {selectedEvent.description}
                </p>
              )}
            </section>
            <footer className="modal-card-foot">
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
                    カレンダーに追加
                </button>
                <button className="button" onClick={closeModal}>
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
