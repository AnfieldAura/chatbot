import React from 'react';

interface Session {
  title: string;
  time: string;
}

interface DaySchedule {
  day: string;
  morningSessions: Session[];
  afternoonSessions: Session[];
  lunchBreak: string;
}

const TimeTableWidget: React.FC = () => {
  const ps21Schedule: DaySchedule[] = [
    {
      day: 'Monday',
      morningSessions: [
        { title: 'DS', time: ' 10:00 AM - 10:50 AM' },
        { title: 'DL', time: ' 10:50 AM - 11:40 AM' },
        { title: 'Short Break', time: ' 11:40 AM - 11:50 AM' },
        { title: 'COA', time: ' 11:50 AM - 12:40 PM' },
        { title: 'COA', time: ' 12:40 PM - 01:30 PM' },
      ],
      afternoonSessions: [
        { title: 'OS', time: ' 02:15 PM - 03:00 PM' },
        { title: 'RTRP', time: ' 03:00 PM - 03:45 PM' },
        { title: 'RTRP', time: ' 03:45 PM - 04:30 PM' },
      ],
      lunchBreak: ' 01:30 PM - 02:15 PM',
    },
    // Add other days for PS21 here...
  ];

  const ps22Schedule: DaySchedule[] = [
    {
      day: 'Monday',
      morningSessions: [
        { title: 'ACD', time: '10:00 AM - 10:50 AM' },
        { title: 'OS', time: '10:50 AM - 11:40 AM' },
        { title: 'Short Break', time: '11:40 AM - 11:50 AM' },
        { title: 'DL_LAB/DS_LAB', time: '11:50 AM - 12:40 PM' },
        { title: 'DL_LAB/DS_LAB', time: '12:40 PM - 01:30 PM' },
      ],
      afternoonSessions: [
        { title: 'DS', time: '02:15 PM - 03:00 PM' },
        { title: 'RTRP', time: '03:00 PM - 03:45 PM' },
        { title: 'RTRP', time: '03:45 PM - 04:30 PM' },
      ],
      lunchBreak: '01:30 PM - 02:15 PM',
    },
    {
      day: 'Tuesday',
      morningSessions: [
        { title: 'COA', time: '10:00 AM - 10:50 AM' },
        { title: 'COA', time: '10:50 AM - 11:40 AM' },
        { title: 'Short Break', time: '11:40 AM - 11:50 AM' },
        { title: 'DL', time: '11:50 AM - 12:40 PM' },
        { title: 'ACD', time: '12:40 PM - 01:30 PM' },
      ],
      afternoonSessions: [
        { title: 'OS', time: '02:15 PM - 03:00 PM' },
        { title: 'RTRP', time: '03:00 PM - 03:45 PM' },
        { title: 'RTRP', time: '03:45 PM - 04:30 PM' },
      ],
      lunchBreak: '01:30 PM - 02:15 PM',
    },
    // Add other days for PS22 here...
  ];

  return (
    <div className="time-table-widget">
      <h1 className="text-xl font-bold mb-4"><b>Class PS21</b></h1>
      <div className="tabs">
        {ps21Schedule.map((day, index) => (
          <div key={index} className="tab">
            <h2 className="tab-title">{day.day}</h2>
            <div className="sessions">
              <h3>Morning Sessions</h3>
              <ul>
                {day.morningSessions.map((session, idx) => (
                  <li key={idx}>
                    <span>{session.title}</span>
                    <span>{session.time}</span>
                  </li>
                ))}
              </ul>
              <h3>Lunch Break</h3>
              <p>{day.lunchBreak}</p>
              <h3>Afternoon Sessions</h3>
              <ul>
                {day.afternoonSessions.map((session, idx) => (
                  <li key={idx}>
                    <span>{session.title}</span>
                    <span>{session.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-xl font-bold mt-8 mb-4"><b>Class PS22</b></h1>
      <div className="tabs">
        {ps22Schedule.map((day, index) => (
          <div key={index} className="tab">
            <h2 className="tab-title">{day.day}</h2>
            <div className="sessions">
              <h3>Morning Sessions</h3>
              <ul>
                {day.morningSessions.map((session, idx) => (
                  <li key={idx}>
                    <span>{session.title}</span>
                    <span>{session.time}</span>
                  </li>
                ))}
              </ul>
              <h3>Lunch Break</h3>
              <p>{day.lunchBreak}</p>
              <h3>Afternoon Sessions</h3>
              <ul>
                {day.afternoonSessions.map((session, idx) => (
                  <li key={idx}>
                    <span>{session.title}</span>
                    <span>{session.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTableWidget;