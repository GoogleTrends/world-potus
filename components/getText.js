import translations from '../translations.json'
const DEFAULT_LOCALE = 'en'

export default function getText(slug) {
  // const locale = getLocale() || DEFAULT_LOCALE
  const locale = DEFAULT_LOCALE
  return translations[slug][locale]
}

export function getLocale() {
  let locale = navigator.language.split('-')
  locale = locale[0] ? locale[0] : 'en'
  return locale
}
