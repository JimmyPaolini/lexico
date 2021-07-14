import { useRouter } from "next/router"
import { useEffect } from "react"
import { googleAnalyticsPageView } from "../utils/googleAnalytics"

export default function useGoogleAnalytics(): void {
  const router = useRouter()
  const handleRouteChange = (url: URL) => {
    googleAnalyticsPageView(url)
  }
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
}
