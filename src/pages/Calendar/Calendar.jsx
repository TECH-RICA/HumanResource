import { useState } from 'react';
import { HiOutlinePlus, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import './Calendar.css';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const events = [
  { date: '2024-03-15', title: 'Q1 All-Hands', type: 'meeting', color: '#3b82f6' },
  { date: '2024-03-18', title: 'Emily Thompson Leave', type: 'leave', color: '#f59e0b' },
  { date: '2024-03-20', title: 'Team Building Event', type: 'event', color: '#8b5cf6' },
  { date: '2024-03-25', title: 'Payday', type: 'payroll', color: '#22c55e' },
  { date: '2024-03-29', title: 'Good Friday', type: 'holiday', color: '#ef4444' },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1));
  const [showForm, setShowForm] = useState(false);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getEvents = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div><h1>Calendar</h1><p className="page-header-subtitle">Events, meetings, and holidays</p></div>
        <Button icon={HiOutlinePlus} onClick={() => setShowForm(true)}>Add Event</Button>
      </div>

      <Card>
        <div className="calendar-header">
          <button className="btn btn-ghost btn-icon" onClick={prev}><HiOutlineChevronLeft size={18} /></button>
          <h3>{MONTHS[month]} {year}</h3>
          <button className="btn btn-ghost btn-icon" onClick={next}><HiOutlineChevronRight size={18} /></button>
        </div>
        <div className="calendar-grid">
          {DAYS.map((d) => <div key={d} className="calendar-day-header">{d}</div>)}
          {calendarDays.map((day, i) => {
            const dayEvents = getEvents(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={i} className={`calendar-cell ${!day ? 'empty' : ''} ${isToday ? 'today' : ''}`}>
                {day && <span className="calendar-date">{day}</span>}
                {dayEvents.map((evt, j) => (
                  <div key={j} className="calendar-event" style={{ background: evt.color + '18', color: evt.color, borderLeft: `3px solid ${evt.color}` }}>
                    {evt.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6">
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Upcoming Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {events.map((evt, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ width: 4, height: 36, borderRadius: 2, background: evt.color }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{evt.title}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>{evt.date}</div>
                </div>
                <Badge variant="gray">{evt.type}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Add Event" size="md"
        footer={<><Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button><Button>Save</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Input label="Event Title" required placeholder="e.g. Team Meeting" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <Input label="Date" type="date" required />
            <Input label="Time" type="time" />
          </div>
          <Input label="Description" type="textarea" placeholder="Event details..." />
        </div>
      </Modal>
    </div>
  );
}
