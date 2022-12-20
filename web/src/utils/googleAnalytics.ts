export function googleAnalyticsPageView(url: URL): void {
  const gtag = (window as any)?.gtag
  gtag('config', process.env.GOOGLE_ANALYTICS_ID, {
    page_path: url,
  })
}

type GoogleAnalyticsEventParams = {
  category: string
  label: string
  value: any
  [key: string]: any
}
export function googleAnalyticsEvent(
  action: string,
  { category, label, value, ...params }: GoogleAnalyticsEventParams,
): void {
  if (typeof window === 'undefined') return
  const gtag = (window as any)?.gtag
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  })
}
