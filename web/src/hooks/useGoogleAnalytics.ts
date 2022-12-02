import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { googleAnalyticsPageView } from 'src/utils/googleAnalytics'

export const useGoogleAnalytics = (): void => {
  const router = useRouter()
  const handleRouteChange = (url: URL) => {
    googleAnalyticsPageView(url)
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
