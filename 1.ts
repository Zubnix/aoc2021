import { input } from './1-input.ts'

const measurements = input.trim().split('\n').map(element => element.trim()).map(element => Number.parseInt(element))

function first () {
  const countContext = { count: 0, previous: measurements[0] }
  measurements.reduce((context, current) => {
    if (context.previous < current) {
      context.count++
    }
    context.previous = current
    return context
  }, countContext)

  console.log(JSON.stringify(countContext))
}
first()

function second () {
  const countContext: { sumList: number[][]; count: number } = { count: 0, sumList: [] }

  measurements.reduce((context, current) => {
    const incompleteSums = countContext.sumList.filter(sum => sum.length < 3)
    incompleteSums.forEach(incompleteSum => incompleteSum.push(current))
    countContext.sumList.push([current])

    const completeSums = countContext.sumList.filter(sum => sum.length === 3)
    console.assert(completeSums.length <= 2)

    if(completeSums.length === 2) {
      const [firstSum, secondSum] = completeSums
      if (firstSum.reduce((sum, element) => sum + element) < secondSum.reduce((sum, element) => sum + element)) {
        context.count++
      }
      countContext.sumList = countContext.sumList.filter(sum => sum !== firstSum)
    }

    return context
  }, countContext)

  console.log(JSON.stringify(countContext))
}
second()
