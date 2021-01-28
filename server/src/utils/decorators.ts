import logger from "./log"

const log = logger.getChildLogger()

export function LogRuntime(
  _: Object,
  functionName: string,
  descriptor: PropertyDescriptor,
) {
  const fn = descriptor.value
  descriptor.value = function (...args: any[]) {
    const start = process.hrtime()
    const result = fn.apply(this, args)
    const runtimeInMs = process.hrtime(start)[1] / 1000000
    log.debug({ functionName, args, runtimeInMs })
    return result
  }
}

export const LogResult = (
  _: Object,
  functionName: string,
  descriptor: PropertyDescriptor,
) => {
  const fn = descriptor.value
  descriptor.value = function (...args: any[]) {
    const result = fn.apply(this, args)
    log.debug({ functionName, args, result })
    return result
  }
}
