export const PROJECT_ID = 91
export const API_URL = `https://backend.prohome.uz/api/v1/leeds/external/${PROJECT_ID}`

export const TELEGRAM_URL = 'https://t.me/QirGuliCity'

// Telegramga o'tishdan oldin API javobini kutish uchun maksimal vaqt (ms)
export const API_WAIT_MS = 1500

/**
 * Faqat telefon raqam yuboriladi: phone=+998901234567
 * form-urlencoded + no-cors — brauzer CORS preflight (OPTIONS) yubormaydi,
 * shuning uchun backendda CORS sozlanmagan bo'lsa ham so'rov yetib boradi.
 * keepalive — Telegramga o'tib ketilsa ham so'rov uzilmaydi.
 */
export async function submitLead(phone) {
  if (!API_URL) return
  const req = fetch(API_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams({ phone }),
    keepalive: true,
  }).catch(() => {})
  await Promise.race([req, new Promise((r) => setTimeout(r, API_WAIT_MS))])
}
