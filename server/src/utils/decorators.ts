// export const logResult = (
//   target: Object,
//   propertyKey: string,
//   descriptor: PropertyDescriptor,
// ) => {
//   const fn = descriptor.value
//   descriptor.value = (...args: any[]) => {
//     const result = fn.apply(this, args)
//     const resultLog =
//       typeof result === "string" ? result : JSON.stringify(result, null, 2)
//     console.log(resultLog)
//     return result
//   }
// }

// export const logRuntime = (
//   target: Object,
//   propertyKey: string,
//   descriptor: PropertyDescriptor,
// ) => {
//   const fn = descriptor.value
//   descriptor.value = (...args: any[]) => {
//     console.time(propertyKey)
//     const result = fn.apply(this, args)
//     console.timeEnd(propertyKey)
//     return result
//   }
// }
