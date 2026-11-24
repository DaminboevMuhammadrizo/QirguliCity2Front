// mask: '#' = raqam
export const COUNTRIES = [
  { code: 'UZ', name: "O'zbekiston", dial: '+998', flag: '🇺🇿', mask: '## ### ## ##' },
  { code: 'RU', name: 'Rossiya', dial: '+7', flag: '🇷🇺', mask: '### ### ## ##' },
  { code: 'KZ', name: "Qozog'iston", dial: '+7', flag: '🇰🇿', mask: '### ### ## ##' },
  { code: 'KG', name: "Qirg'iziston", dial: '+996', flag: '🇰🇬', mask: '### ### ###' },
  { code: 'TJ', name: 'Tojikiston', dial: '+992', flag: '🇹🇯', mask: '## ### ## ##' },
  { code: 'TM', name: 'Turkmaniston', dial: '+993', flag: '🇹🇲', mask: '## ## ## ##' },
  { code: 'TR', name: 'Turkiya', dial: '+90', flag: '🇹🇷', mask: '### ### ## ##' },
  { code: 'AE', name: 'BAA', dial: '+971', flag: '🇦🇪', mask: '## ### ####' },
  { code: 'KR', name: 'Janubiy Koreya', dial: '+82', flag: '🇰🇷', mask: '## #### ####' },
  { code: 'US', name: 'AQSh', dial: '+1', flag: '🇺🇸', mask: '### ### ####' },
  { code: 'GB', name: 'Buyuk Britaniya', dial: '+44', flag: '🇬🇧', mask: '#### ### ###' },
  { code: 'DE', name: 'Germaniya', dial: '+49', flag: '🇩🇪', mask: '### ########' },
  { code: 'PL', name: 'Polsha', dial: '+48', flag: '🇵🇱', mask: '### ### ###' },
  { code: 'AZ', name: 'Ozarbayjon', dial: '+994', flag: '🇦🇿', mask: '## ### ## ##' },
  { code: 'UA', name: 'Ukraina', dial: '+380', flag: '🇺🇦', mask: '## ### ## ##' },
  { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾', mask: '## ### ## ##' },
]

export const maskLength = (mask) => (mask.match(/#/g) || []).length

export function formatByMask(digits, mask) {
  let out = ''
  let i = 0
  for (const ch of mask) {
    if (i >= digits.length) break
    if (ch === '#') out += digits[i++]
    else out += ch
  }
  return out
}
