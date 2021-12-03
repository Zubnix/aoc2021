import { input } from "./3-input.ts";

const diagnosticReport =input.trim().split('\n').map(element => element.trim()).map(element=>Number.parseInt(element,2))

function first() {
  const context: { gammaBitCount: [number,number,number,number,number,number,number,number,number,number,number,number]} = { gammaBitCount: [0,0,0,0,0,0,0,0,0,0,0,0] }
  const gamma = diagnosticReport.reduce((context, diagnostic) => {
    for (let i = 0; i < context.gammaBitCount.length; i++) {
      const bitMask = 1 << i
      const gammaBit = diagnostic & bitMask
      if(gammaBit) {
        context.gammaBitCount[i]++
      } else {
        context.gammaBitCount[i]--
      }
    }
    return context
  }, context).gammaBitCount.reduce((gamma, bit, index)=> {
    if(bit > 0){
      return gamma | (1 << index)
    } else {
      return gamma
    }
  },0)
  console.log(gamma*((~gamma) & 0x0FFF))
}
first()

function second() {
  type CountContext = { zeros: number[], ones: number[] }

  function oxygenFilter(countContext: CountContext){
    if(countContext.ones.length >= countContext.zeros.length) {
      return countContext.ones
    } else {
      return countContext.zeros
    }
  }

  function co2Filter(countContext: CountContext){
    if(countContext.ones.length >= countContext.zeros.length) {
      return countContext.zeros
    } else {
      return countContext.ones
    }
  }

  function filter(diagnostics: number[], bitMask: number, filter: (countContext: CountContext)=> number[]){
    const countContext = diagnostics.reduce((context: CountContext, current)=>{
      if(current & bitMask) {
        context.ones.push(current)
      } else {
        context.zeros.push(current)
      }
      return context
    }, { zeros: [], ones: [] })

    return filter(countContext)
  }

  function runFilter(diagnosticFilter: (countContext: CountContext)=> number[]){
    let candidates = diagnosticReport
    for (let i = 0; i < 12; i++) {
      const bitMask = (1 << 11) >>> i
      candidates = filter(candidates, bitMask, diagnosticFilter)
      if(candidates.length === 1) {
        break
      }
    }
    console.assert(candidates.length === 1)
    return candidates[0]
  }

  const oxygen = runFilter(oxygenFilter)
  const co2 = runFilter(co2Filter)
  console.log(oxygen*co2)
}
second()
