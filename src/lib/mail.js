/**
 * Link for an email button.
 * contact.composeVia in portfolio.json:
 *   "gmail"  → opens Gmail's compose window in a new tab (default)
 *   "mailto" → opens the visitor's default mail app
 */
export function mailLink(contact = {}) {
  const email = contact.email
  if (!email) return null
  if (contact.composeVia === 'mailto') return { href: `mailto:${email}` }
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: email })
  if (contact.subject) params.set('su', contact.subject)
  return {
    href: `https://mail.google.com/mail/?${params}`,
    target: '_blank',
    rel: 'noreferrer',
  }
}
