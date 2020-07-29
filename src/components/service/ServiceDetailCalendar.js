import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'

function ServiceDetailCalendar() {
  const [date, setDate] = useState(new Date())

  return (
    <>
      <Calendar
        onChange={() => {
          setDate(date)
        }}
        value={date}
      />
    </>
  )
}

export default ServiceDetailCalendar
