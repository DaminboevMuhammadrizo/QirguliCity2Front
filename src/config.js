// API manzili keyin qo'shiladi. Bo'sh bo'lsa so'rov yuborilmaydi.
export const API_URL = ''

export const TELEGRAM_URL = 'https://t.me/QirGuliCity'

// Telegramga o'tishdan oldin API javobini kutish uchun maksimal vaqt (ms)
export const API_WAIT_MS = 1500

export async function submitLead(phone) {
  if (!API_URL) return
  const body = JSON.stringify({ phone, source: 'landing', createdAt: new Date().toISOString() })
  const req = fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true, // sahifa yopilsa ham so'rov yetib boradi
  }).catch(() => {})
  await Promise.race([req, new Promise((r) => setTimeout(r, API_WAIT_MS))])
}
