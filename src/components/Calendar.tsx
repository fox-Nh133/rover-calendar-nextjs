import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar: React.FC = () => {
    const calendarRef = useRef<FullCalendar | null>(null);

    const handleDateClick = (arg: any) => {
        alert(`Date: ${arg.dateStr}`);
    };

    const events = [
        { title: 'Event 1', date: '2023-10-01' },
        { title: 'Event 2', date: '2023-10-02' },
    ];

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            dateClick={handleDateClick}
        />
    );
};

export default Calendar;