import { input } from "./5-input.ts"

type LineSegment = readonly [readonly [rex0: number, y0: number], readonly [x1: number, y1: number]]
const lineSegments: LineSegment[] = input.split('\n').map((element) => {
  const [beginCoord, endCoord] = element.split(' -> ').map((element) => {
    const [x, y] = element.split(',').map((element) => Number.parseInt(element));
    return [x, y] as const
  });
  return [beginCoord, endCoord] as const
})

function first () {
  const lineSegmentsHV = lineSegments.filter(([[x0, y0], [x1, y1]]) => x0 === x1 || y0 === y1).map(([[x0, y0], [x1, y1]]) => {
    if((x0 === x1 && y0 > y1) || (y0 === y1 && x0 > x1)) return [[x1, y1], [x0, y0]] as const
    return [[x0, y0], [x1, y1]] as const
  })

  const allPoints = lineSegmentsHV.flatMap(([[x0, y0], [x1, y1]]) => {
    const points: [number, number][] = []
    if(x0 === x1) {
      for (let i = y0; i <= y1; i++) {
        points.push([x0, i])
      }
    } else if(y0 === y1) {
      for (let i = x0; i <= x1; i++) {
        points.push([i, y0])
      }
    }
    return points
  })

  const commonPoints = allPoints.filter((point) => {
    return allPoints.find((otherPoint) => {
      return otherPoint !== point && otherPoint[0] === point[0] && otherPoint[1] === point[1]
    })
  })

  const uniques: [number,number][] = []
  commonPoints.forEach(([x,y])=> {
    const alreadyPresent = uniques.find(([otherX, otherY]) => {
      return otherX === x && otherY === y
    })
    if(!alreadyPresent) {
      uniques.push([x, y])
    }
  })
  console.log(uniques.length)
}
first()

function second () {
  const lineSegmentsHV = lineSegments.map(([[x0, y0], [x1, y1]]) => {
    if((x0 === x1 && y0 > y1) || (x0 > x1)) return [[x1, y1], [x0, y0]] as const
    return [[x0, y0], [x1, y1]] as const
  })

  const allPoints = lineSegmentsHV.flatMap(([[x0, y0], [x1, y1]]) => {
    const points: [number, number][] = []
    if(x0 === x1) {
      for (let i = y0; i <= y1; i++) {
        points.push([x0, i])
      }
    } else if(y0 === y1) {
      for (let i = x0; i <= x1; i++) {
        points.push([i, y0])
      }
    } else {
      if(y0 > y1) {
        for (let i = x0; i <= x1; i++) {
          points.push([i, y0--])
        }
      } else {
        for (let i = x0; i <= x1; i++) {
          points.push([i, y0++])
        }
      }
    }
    return points
  })

  const commonPoints = allPoints.filter((point) => {
    return allPoints.find((otherPoint) => {
      return otherPoint !== point && otherPoint[0] === point[0] && otherPoint[1] === point[1]
    })
  })

  const uniques: [number,number][] = []
  commonPoints.forEach(([x,y])=> {
    const alreadyPresent = uniques.find(([otherX, otherY]) => {
      return otherX === x && otherY === y
    })
    if(!alreadyPresent) {
      uniques.push([x, y])
    }
  })
  console.log(uniques.length)
}
second()
