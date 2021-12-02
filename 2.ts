import { input } from "./2-input.ts";

const course = input.trim().split('\n').map(element => element.trim()).map((element) => {
  const [direction, distance] = element.split(' ')
  return [direction, Number.parseInt(distance)] as const
})


function first () {
  type Position = { x:number, y: number }
  type Instruction = { distance: number }

  const courseDirections: Record<string, (position: Position, instruction: {distance: number})=>Position > = {
    down: (position: Position, instruction: Instruction): Position => ({ ...position, y: position.y+instruction.distance }),
    forward: (position: Position, instruction:  Instruction): Position => ({ ...position, x: position.x+instruction.distance }),
    up: (position: Position, instruction: Instruction): Position => ({ ...position, y: position.y-instruction.distance }),
  }


  const startPosition: Position = { x: 0, y: 0 }
  const endPosition = course.reduce((position, [direction, distance, ])=> courseDirections[direction](position, { distance }), startPosition)
  console.log(JSON.stringify(endPosition.x*endPosition.y))
}
first()

function second() {
  type Position = { x:number, y: number, aim: number }
  type Instruction = { distance: number }

  const courseDirections: Record<string, (position: Position, instruction: {distance: number})=>Position > = {
    down: (position: Position, instruction: Instruction): Position => {
      return ({ ...position, aim: position.aim + instruction.distance });
    },
    up: (position: Position, instruction: Instruction): Position => {
      return ({ ...position, aim: position.aim - instruction.distance });
    },
    forward: (position: Position, instruction:  Instruction): Position => {
      return ({ ...position, x: position.x + instruction.distance, y: position.y + position.aim*instruction.distance });
    },
  }

  const startPosition: Position = { x: 0, y: 0, aim: 0 }
  const endPosition = course.reduce((position, [direction, distance, ])=> courseDirections[direction](position, { distance }), startPosition)
  console.log(JSON.stringify(endPosition.x*endPosition.y))
}
second()
