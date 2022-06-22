/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react'

export default function useEventListener(
  eventName: string,
  handler: any,
): void {
  // Create a ref that stores handler
  const savedHandler = useRef()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure window supports addEventListener
      const isSupported = window && window.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => (savedHandler.current as any)(event)

      // Add event listener
      window.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(eventName, eventListener)
      }
    },
    [eventName], // Re-run if eventName changes
  )
}
