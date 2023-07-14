import React,{useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export default function CalendarComp() {
  const [value, onChange] = useState(new Date());

  return (
    <div className='calendar-div'>
      <p className='calendar-label'>Calendar</p>
      <Calendar onChange={onChange} value={value} />
      <div className='calendar-lower'>
        <h5 className='schedule-text'>Schedule</h5>
        <div className='schedule-event'>
          <p className='schedule-event-name'>Money Expo India 2023</p>
          <p className='schedule-event-loc'>Jio World Convention Centre</p>
        </div>
      </div>
    </div>
  );
}
