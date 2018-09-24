const uninitialized = 'UNINITIALIZED'

export default <T>(
  array: T[],
  count: number,
  probLens: (e: T) => number,
): T[] => {
  if (array.length === 0) {
    throw new Error(`Can't draw from an empty array`)
  }

  let drawnValues: T[] = []
  for (let i = 0; i < count; i++) {
    if (array.length === 1) {
      drawnValues.push(array[0])
      continue
    }
    let drawnValue: T | 'UNINITIALIZED' = uninitialized
    do {
      let n = Math.random()
      let j = 0
      while (n > 0) {
        const value = array[j]
        if (!value) {
          throw new Error(
            'Error drawing value: probabilities not properly normalized',
          )
        }
        const prob = probLens(value)
        drawnValue = value
        n -= prob
        j++
      }
    } while (drawnValues[i - 1] === drawnValue)
    if (drawnValue === uninitialized) {
      throw new Error(`Didn't draw a value (this shouldn't happen)`)
    }
    drawnValues.push(drawnValue)
  }

  return drawnValues
}
