import log from '../../../utils/log'

type Props = {
  logRuntime?: boolean
  logParams?: boolean
  mapParams?: (params: any) => any
  logResult?: boolean
  mapResult?: (result: any) => any
}

export function Log(props?: Props) {
  return function Log(
    _target: unknown,
    functionName: string,
    propertyDescriptor: PropertyDescriptor
  ): void {
    const decoratedFunction = propertyDescriptor.value
    propertyDescriptor.value = async function (...params: unknown[]) {
      const start = process.hrtime()
      const result = await decoratedFunction.apply(this, params)
      const runtime = process.hrtime(start)[1] / 1000000 // in milliseconds
      log.info(functionName, {
        ...(props?.logRuntime === false ? {} : { runtime }),
        ...(props?.logParams === false
          ? {}
          : { params: props?.mapParams?.(params) ?? params }),
        ...(props?.logResult === false
          ? {}
          : { result: props?.mapResult?.(result) ?? result }),
      })
      return result
    }
  }
}
