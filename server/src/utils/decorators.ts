import logger from "./log"

const log = logger.getChildLogger()

export const logResult = (
  _: Object,
  __: string,
  descriptor: PropertyDescriptor,
) => {
  const fn = descriptor.value
  descriptor.value = (...args: any[]) => {
    const result = fn.apply(this, args)
    const resultLog =
      typeof result === "string" ? result : JSON.stringify(result, null, 2)
    console.log(resultLog)
    return result
  }
}

export function logRuntime(
  _: Object,
  __: string,
  descriptor: PropertyDescriptor,
) {
  const fn = descriptor.value
  descriptor.value = (...args: any[]) => {
    const t0 = performance.now()
    const result = fn(...args)
    log.info("Runtime:", msToTime(performance.now() - t0))
    return result
  }
}

function msToTime(duration: number): string {
  let milliseconds = (duration % 1000) / 100
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  let hoursString = hours < 10 ? "0" + hours : hours
  let minutesString = minutes < 10 ? "0" + minutes : minutes
  let secondsString = seconds < 10 ? "0" + seconds : seconds

  return (
    hoursString + ":" + minutesString + ":" + secondsString + "." + milliseconds
  )
}
