export function googleAnalyticsPageView(url: URL): void {
  if (typeof window === 'undefined') return
  const gtag = window?.gtag
  gtag('consent', String(process.env.GOOGLE_ANALYTICS_ID), {
    page_path: url,
  })
}

type GoogleAnalyticsEventParams = {
  category: string
  label: string
  value: unknown
  [key: string]: unknown
}
export function googleAnalyticsEvent(
  action: string,
  { category, label, value, ...params }: GoogleAnalyticsEventParams
): void {
  if (typeof window === 'undefined') return
  const gtag = window?.gtag
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  })
}
