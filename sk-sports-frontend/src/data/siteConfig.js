// =========================================================
// SITE CONFIG - edit your academy's real details here.
// Everything marked "EDIT" is a placeholder to confirm with the client.
// =========================================================

export const site = {
  name: 'SK Sports',
  fullName: 'SK Sports Taekwondo Academy',
  city: 'Lucknow',
  state: 'Uttar Pradesh',

  // EDIT: real contact details
  phone: '+91 95551 69364',
  phoneLink: '+919555169364', // digits only, used for tel: links
  whatsapp: '919555169364', // country code + number, no "+" or spaces
  email: 'info@sksports.in',
  address: 'Academy address line, Lucknow, Uttar Pradesh 2260XX',

  // EDIT: what Google Maps should search for (best: exact academy name + area)
  mapQuery: 'Lucknow, Uttar Pradesh',

  // Opening hours. day: 0 = Sunday ... 6 = Saturday. Times in 24h format.
  hours: [
    { label: 'Mon – Fri', days: [1, 2, 3, 4, 5], open: '06:00', close: '21:00', text: '6:00 AM – 9:00 PM' },
    { label: 'Saturday', days: [6], open: '08:00', close: '13:00', text: '8:00 AM – 1:00 PM' },
    { label: 'Sunday', days: [0], open: null, close: null, text: 'Closed' },
  ],

  // EDIT: real social links
  socials: {
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    facebook: 'https://facebook.com/',
  },
  socialHandles: {
    instagram: '@sksports.lucknow',
    youtube: 'SK Sports Taekwondo',
    facebook: 'SK Sports Lucknow',
  },

  // EDIT: next grading date shown on Schedule + Belt Progress pages
  nextGrading: '12 November 2026',
  notice: 'Academy closed on 2 November for Diwali celebrations',
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/classes', label: 'Classes' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/belt-progress', label: 'Belt Progress' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Helper: WhatsApp link with a pre-filled message
export const whatsappLink = (message = 'Hi SK Sports! I would like to know more about Taekwondo classes.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
