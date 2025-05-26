//timetable
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
        { title: 'DS', time: '09:30 AM - 10:20 AM' },
        { title: 'DL', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'COA', time: '11:25 AM - 12:15 PM' },
        { title: 'COA', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'OS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Tuesday',
      morningSessions: [
        { title: 'DS_LAB/OS_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'DS_LAB/OS_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'COA', time: '11:25 AM - 12:15 PM' },
        { title: 'DL', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'ACD', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Wednesday',
      morningSessions: [
        { title: 'OS', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ACD', time: '11:25 AM - 12:15 PM' },
        { title: 'ACD', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'DS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Thursday',
      morningSessions: [
        { title: 'OS_LAB/DL_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'OS_LAB/DL_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'OS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Friday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'COA', time: '11:25 AM - 12:15 PM' },
        { title: 'DL', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'DS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Saturday',
      morningSessions: [
        { title: 'DL', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ACD', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'COA', time: '02:00 PM - 02:50 PM' },
        { title: 'COI', time: '02:50 PM - 03:40 PM' },
        { title: 'COI', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
  ];

  const ps22Schedule: DaySchedule[] = [
    {
      day: 'Monday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DL_LAB/DS_LAB', time: '11:25 AM - 12:15 PM' },
        { title: 'DL_LAB/DS_LAB', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'DS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Tuesday',
      morningSessions: [
        { title: 'COA', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DL', time: '11:25 AM - 12:15 PM' },
        { title: 'ACD', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'OS', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Wednesday',
      morningSessions: [
        { title: 'DS', time: '09:30 AM - 10:20 AM' },
        { title: 'DS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'OS_LAB/DL_LAB', time: '11:25 AM - 12:15 PM' },
        { title: 'OS_LAB/DL_LAB', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'ACD', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Thursday',
      morningSessions: [
        { title: 'COA', time: '09:30 AM - 10:20 AM' },
        { title: 'DS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'OS', time: '11:25 AM - 12:15 PM' },
        { title: 'OS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'DL', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Friday',
      morningSessions: [
        { title: 'DL', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS_LAB/OS_LAB', time: '11:25 AM - 12:15 PM' },
        { title: 'DS_LAB/OS_LAB', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'ACD', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Saturday',
      morningSessions: [
        { title: 'DL', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ACD', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'COA', time: '02:00 PM - 02:50 PM' },
        { title: 'COI', time: '02:50 PM - 03:40 PM' },
        { title: 'COI', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
  ];

  const ps11Schedule: DaySchedule[] = [
    {
      day: 'Monday',
      morningSessions: [
        { title: 'OS_LAB/ML_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'OS_LAB/ML_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ML', time: '11:25 AM - 12:15 PM' },
        { title: 'OS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Tuesday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Wednesday',
      morningSessions: [
        { title: 'OS', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ML', time: '11:25 AM - 12:15 PM' },
        { title: 'ACD', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Thursday',
      morningSessions: [
        { title: 'OS_LAB/ML_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'OS_LAB/ML_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Friday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'ACD', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'COA', time: '11:25 AM - 12:15 PM' },
        { title: 'OS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Saturday',
      morningSessions: [
        { title: 'COA', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
  ];

  const ps12Schedule: DaySchedule[] = [
    {
      day: 'Monday',
      morningSessions: [
        { title: 'COA', time: '09:30 AM - 10:20 AM' },
        { title: 'COA', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'OS', time: '11:25 AM - 12:15 PM' },
        { title: 'OS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Tuesday',
      morningSessions: [
        { title: 'OS_LAB/ML_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'OS_LAB/ML_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Wednesday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'ACD', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'OS', time: '11:25 AM - 12:15 PM' },
        { title: 'OS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Thursday',
      morningSessions: [
        { title: 'ACD', time: '09:30 AM - 10:20 AM' },
        { title: 'ACD', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Friday',
      morningSessions: [
        { title: 'COA', time: '09:30 AM - 10:20 AM' },
        { title: 'ACD', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'ML', time: '11:25 AM - 12:15 PM' },
        { title: 'ML', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Saturday',
      morningSessions: [
        { title: 'OS_LAB/ML_LAB', time: '09:30 AM - 10:20 AM' },
        { title: 'OS_LAB/ML_LAB', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
  ];

  const ps13Schedule: DaySchedule[] = [
    {
      day: 'Monday',
    morningSessions: [
      { title: 'COA', time: '09:30 AM - 10:20 AM' },
      { title: 'COA', time: '10:20 AM - 11:10 AM' },
      { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
      { title: 'OS_LAB/ML_LAB', time: '11:25 AM - 12:15 PM' },
      { title: 'OS_LAB/ML_LAB', time: '12:15 PM - 01:05 PM' },
    ],
    afternoonSessions: [
      { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
      { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
      { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
    ],
    lunchBreak: '01:05 PM - 02:00 PM',
  },
  {
    day: 'Tuesday',
    morningSessions: [
      { title: 'ACD', time: '09:30 AM - 10:20 AM' },
      { title: 'ACD', time: '10:20 AM - 11:10 AM' },
      { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
      { title: 'DS', time: '11:25 AM - 12:15 PM' },
      { title: 'DS', time: '12:15 PM - 01:05 PM' },
    ],
    afternoonSessions: [
      { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
      { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
      { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
    ],
    lunchBreak: '01:05 PM - 02:00 PM',
  },
  {
    day: 'Wednesday',
    morningSessions: [
      { title: 'COA', time: '09:30 AM - 10:20 AM' },
      { title: 'OS', time: '10:20 AM - 11:10 AM' },
      { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
      { title: 'ML', time: '11:25 AM - 12:15 PM' },
      { title: 'ML', time: '12:15 PM - 01:05 PM' },
    ],
    afternoonSessions: [
      { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
      { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
      { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
    ],
    lunchBreak: '01:05 PM - 02:00 PM',
  },
  {
    day: 'Thursday',
    morningSessions: [
      { title: 'ACD', time: '09:30 AM - 10:20 AM' },
      { title: 'ACD', time: '10:20 AM - 11:10 AM' },
      { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
      { title: 'DS', time: '11:25 AM - 12:15 PM' },
      { title: 'DS', time: '12:15 PM - 01:05 PM' },
    ],
    afternoonSessions: [
      { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
      { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
      { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
    ],
    lunchBreak: '01:05 PM - 02:00 PM',
  },
    {
      day: 'Friday',
      morningSessions: [
        { title: 'OS', time: '09:30 AM - 10:20 AM' },
        { title: 'ACD', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'OS_LAB/ML_LAB', time: '11:25 AM - 12:15 PM' },
        { title: 'OS_LAB/ML_LAB', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
    {
      day: 'Saturday',
      morningSessions: [
        { title: 'OS', time: '09:30 AM - 10:20 AM' },
        { title: 'OS', time: '10:20 AM - 11:10 AM' },
        { title: 'Short Break', time: '11:10 AM - 11:25 AM' },
        { title: 'DS', time: '11:25 AM - 12:15 PM' },
        { title: 'DS', time: '12:15 PM - 01:05 PM' },
      ],
      afternoonSessions: [
        { title: 'RTRP', time: '02:00 PM - 02:50 PM' },
        { title: 'RTRP', time: '02:50 PM - 03:40 PM' },
        { title: 'RTRP', time: '03:40 PM - 04:30 PM' },
      ],
      lunchBreak: '01:05 PM - 02:00 PM',
    },
  ];

  const timeSlots = [
    '09:30 AM - 10:20 AM',
    '10:20 AM - 11:10 AM',
    '11:10 AM - 11:25 AM',
    '11:25 AM - 12:15 PM',
    '12:15 PM - 01:05 PM',
    '01:05 PM - 02:00 PM',
    '02:00 PM - 02:50 PM',
    '02:50 PM - 03:40 PM',
    '03:40 PM - 04:30 PM',
  ];
  return (
    <div className="time-table-widget">
      <h1 className="text-xl font-bold mb-4">CLASS PS21 TIMETABLE</h1>
      {/* PS21 Timetable */}
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ps21Schedule.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{day.day}</td>
              {timeSlots.map((time, idx) => {
                const session =
                  day.morningSessions.find((s) => s.time === time) ||
                  day.afternoonSessions.find((s) => s.time === time) ||
                  (day.lunchBreak === time ? { title: 'Lunch Break' } : null);
                return (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {session ? session.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-xl font-bold mt-8 mb-4">CLASS PS22 TIMETABLE</h1>
      {/* PS22 Timetable */}
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ps22Schedule.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{day.day}</td>
              {timeSlots.map((time, idx) => {
                const session =
                  day.morningSessions.find((s) => s.time === time) ||
                  day.afternoonSessions.find((s) => s.time === time) ||
                  (day.lunchBreak === time ? { title: 'Lunch Break' } : null);
                return (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {session ? session.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-xl font-bold mt-8 mb-4">CLASS PS11 TIMETABLE</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ps11Schedule.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{day.day}</td>
              {timeSlots.map((time, idx) => {
                const session =
                  day.morningSessions.find((s) => s.time === time) ||
                  day.afternoonSessions.find((s) => s.time === time) ||
                  (day.lunchBreak === time ? { title: 'Lunch Break' } : null);
                return (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {session ? session.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-xl font-bold mt-8 mb-4">CLASS PS12 TIMETABLE</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ps12Schedule.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{day.day}</td>
              {timeSlots.map((time, idx) => {
                const session =
                  day.morningSessions.find((s) => s.time === time) ||
                  day.afternoonSessions.find((s) => s.time === time) ||
                  (day.lunchBreak === time ? { title: 'Lunch Break' } : null);
                return (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {session ? session.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-xl font-bold mt-8 mb-4">ClASS PS13 TIMETABLE</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {timeSlots.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ps13Schedule.map((day, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 font-bold">{day.day}</td>
              {timeSlots.map((time, idx) => {
                const session =
                  day.morningSessions.find((s) => s.time === time) ||
                  day.afternoonSessions.find((s) => s.time === time) ||
                  (day.lunchBreak === time ? { title: 'Lunch Break' } : null);
                return (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {session ? session.title : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTableWidget;