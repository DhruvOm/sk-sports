// =========================================================
// API SERVICE: sends form data to Django.
// If VITE_API_URL is not set (.env missing), it runs in demo mode.
// =========================================================

const API_URL = import.meta.env.VITE_API_URL
const USE_BACKEND = Boolean(API_URL)

async function post(path, data) {
  if (!USE_BACKEND) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log(`[demo] POST ${path}`, data)
    return { ok: true, data }
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    // Django sends errors like { "phone": ["Enter a valid ..."] }
    const error = new Error('Request failed')
    error.status = res.status
    error.fields = body
    throw error
  }
  return { ok: true, data: body }
}

// Turn any error into one readable sentence for the user
export function errorText(err) {
  if (err.status === 429) return 'Too many attempts. Please try again later or WhatsApp us.'
  if (err.fields && typeof err.fields === 'object') {
    const messages = Object.values(err.fields).flat().filter((m) => typeof m === 'string')
    if (messages.length) return messages.join(' ')
  }
  return 'Could not reach the server. Please call or WhatsApp us.'
}

// POST /api/enquiries/
export const sendEnquiry = (data) => post('/enquiries/', data)

// POST /api/trial-bookings/
export const bookTrial = (data) => post('/trial-bookings/', data)