// =========================================================
// WEEKLY SCHEDULE
// Later this will come from Django:  GET /api/schedule/
// day: 0 = Sunday, 1 = Monday ... 6 = Saturday
// classId must match an id in classes.js
// EDIT: replace with the academy's real batch timings
// =========================================================

export const days = [
  { id: 1, short: 'Mon', name: 'Monday' },
  { id: 2, short: 'Tue', name: 'Tuesday' },
  { id: 3, short: 'Wed', name: 'Wednesday' },
  { id: 4, short: 'Thu', name: 'Thursday' },
  { id: 5, short: 'Fri', name: 'Friday' },
  { id: 6, short: 'Sat', name: 'Saturday' },
  { id: 0, short: 'Sun', name: 'Sunday' },
]

export const scheduleSlots = [
  // Morning
  { day: 1, start: '06:30', end: '07:30', classId: 'adults' },
  { day: 3, start: '06:30', end: '07:30', classId: 'adults' },
  { day: 5, start: '06:30', end: '07:30', classId: 'adults' },
  { day: 6, start: '09:00', end: '10:00', classId: 'junior-warriors' },
  { day: 6, start: '10:30', end: '12:00', classId: 'competition' },

  // Evening
  { day: 1, start: '17:00', end: '17:45', classId: 'little-dragons' },
  { day: 3, start: '17:00', end: '17:45', classId: 'little-dragons' },
  { day: 5, start: '17:00', end: '17:45', classId: 'little-dragons' },

  { day: 2, start: '17:00', end: '18:00', classId: 'junior-warriors' },
  { day: 4, start: '17:00', end: '18:00', classId: 'junior-warriors' },

  { day: 1, start: '18:00', end: '19:00', classId: 'teens' },
  { day: 3, start: '18:00', end: '19:00', classId: 'teens' },
  { day: 5, start: '18:00', end: '19:00', classId: 'teens' },

  { day: 2, start: '18:30', end: '20:00', classId: 'competition' },
  { day: 4, start: '18:30', end: '20:00', classId: 'competition' },

  { day: 1, start: '19:15', end: '20:15', classId: 'adults' },
  { day: 3, start: '19:15', end: '20:15', classId: 'adults' },
  { day: 5, start: '19:15', end: '20:15', classId: 'adults' },
]

// EDIT: special sessions / events
export const specialEvents = [
  { title: 'Belt Grading Test', month: 'NOV', day: '12', time: '3:00 PM', color: 'blue', text: 'Colour belt grading for eligible students.' },
  { title: 'Sparring Camp', month: 'NOV', day: '15', time: '9:00 AM', color: 'blue', text: 'Weekend kyorugi camp for Junior Warriors & above.' },
  { title: 'Upcoming Tournament', month: 'DEC', day: '05', time: 'All Day', color: 'orange', text: 'District level championship. Selection based.' },
]

// ---------- Helpers ----------

// "17:30" -> "5:30 PM"
export function formatTime(t) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

export const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export const isMorning = (slot) => toMinutes(slot.start) < 12 * 60

export function slotsForDay(day) {
  return scheduleSlots.filter((s) => s.day === day).sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
}

// Status of a slot today: 'done' | 'live' | 'soon' | 'later'
export function slotStatus(slot, now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes()
  const start = toMinutes(slot.start)
  const end = toMinutes(slot.end)
  if (mins >= end) return 'done'
  if (mins >= start) return 'live'
  if (start - mins <= 60) return 'soon'
  return 'later'
}
