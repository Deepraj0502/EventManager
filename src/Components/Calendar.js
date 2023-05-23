import React from 'react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page,setOptions } from '@mobiscroll/react';
import './Calendar.css';
setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

export default function Calendar() {
  const now = new Date();
    const [labels] = React.useState([
        { date: new Date(now.getFullYear(), now.getMonth(), 27), text: 'TIA Expo', color: 'red' },
        { date: new Date(now.getFullYear(), now.getMonth(), 18), text: 'Workshop', color: '#9ccc65' },
        { date: new Date(now.getFullYear(), now.getMonth(), 8), text: 'React', color: '#d4e157' },
        { date: new Date(now.getFullYear(), now.getMonth()+1, 5), text: 'Seminar', color: "#f4511e" }
    ]);
  return (
    <div>
      <Page>
            <div className="mbsc-grid">
                <div className="mbsc-row">
                    <div className="mbsc-col-sm-12 mbsc-col-md-4">
                        <div className="mbsc-form-group">
                            <div className='calendar-div'>
                              <p className='calendar-label'>Calendar</p>
                              <Datepicker controls={['calendar']} display="inline" labels={labels} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    </div>
  )
}
