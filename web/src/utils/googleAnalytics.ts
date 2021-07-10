export function googleAnalyticsPageView(url: URL): void {
  const gtag = (window as any)?.gtag
  gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}

interface GoogleAnalyticsEventParams {
  category: string
  label: string
  value: any
  [key: string]: any
}
export function googleAnalyticsEvent(
  action: string,
  { category, label, value, ...params }: GoogleAnalyticsEventParams,
): void {
  const gtag = (window as any)?.gtag
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  })
}
