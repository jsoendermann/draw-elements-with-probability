const uninitialized = Symbol('uninitialized')

export default <E, V>(
  array: E[],
  count: number,
  valueLens: (e: E) => V,
  probLens: (e: E) => number,
) => {
  if (array.length === 0) {
    throw new Error(`Can't draw from an empty array`)
  }

  let drawnValues: V[] = []
  for (let i = 0; i < count; i++) {
    if (array.length === 1) {
      drawnValues.push(valueLens(array[0]))
      continue
    }
    let drawnValue: V | typeof uninitialized = uninitialized
    do {
      let n = Math.random()
      let j = 0
      while (n > 0) {
        const e = array[j]
        if (!e) {
          throw new Error(
            'Error drawing value: probabilities not properly normalized',
          )
        }
        const value = valueLens(e)
        const prob = probLens(e)
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
