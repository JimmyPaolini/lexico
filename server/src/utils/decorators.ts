import log from '../../../utils/log'

export function LogRuntime(
  _: unknown,
  functionName: string,
  descriptor: PropertyDescriptor,
): void {
  const fn = descriptor.value
  descriptor.value = async function (...args: any[]) {
    const start = process.hrtime()
    const result = await fn.apply(this, args)
    const runtimeInMs = process.hrtime(start)[1] / 1000000
    log.debug({ functionName, args, runtimeInMs })
    return result
  }
}

export function LogResult(
  _: unknown,
  functionName: string,
  descriptor: PropertyDescriptor,
): void {
  const fn = descriptor.value
  descriptor.value = async function (...args: any[]) {
    const result = await fn.apply(this, args)
    log.debug({ functionName, args, result })
    return result
  }
}
