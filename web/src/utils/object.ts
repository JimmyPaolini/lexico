export const invertDictionary = <
  K extends string | number | symbol,
  V extends string | number | symbol
>(dictionary: { [key in K]: V }) =>
  Object.entries(dictionary).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value as any]: key,
    }),
    {} as { [key in V]: K }
  )
