import {input} from "./4-input.ts";

const [numbersDrawnAsString, ...bingoBoardsAsString] = input.split('\n\n')

const numbersDrawn = numbersDrawnAsString.split(',').map((element)=>element.trim()).map((element)=>Number.parseInt(element))
const boards = bingoBoardsAsString.map((element)=> element.split(/\n| /).filter((element) => element.length > 0).map((element) => Number.parseInt(element)))
const boardSize = 5

function first() {
  type BoardContext = {
    board: number[]
    matchingNumbers: {
      boardNumber: number
      x: number,
      y:number
    }[]
  }

  const boardContexts: BoardContext[] = boards.map((board) => ({ board, matchingNumbers: [] }))

  const winningNumber = numbersDrawn.find((drawnNumber)=> {
    const winnerBoard = boardContexts.find((boardContext) => {
      const boardNumberIndex = boardContext.board.indexOf(drawnNumber)

      if(boardNumberIndex !== -1) {
        boardContext.matchingNumbers.push({
          boardNumber: drawnNumber,
          x: boardNumberIndex % boardSize,
          y: Math.floor(boardNumberIndex / boardSize)
        })

        for (let i = 0; i < boardSize; i++) {
          if(boardContext.matchingNumbers.filter((matchingNumber) => matchingNumber.y === i).length === 5) {
            return true
          }
          if(boardContext.matchingNumbers.filter((matchingNumber) => matchingNumber.x === i).length === 5) {
            return true
          }
        }
      }

      return false
    })

    if(winnerBoard){
      const matchingNumbers = winnerBoard.matchingNumbers.map((matchingNumber)=>matchingNumber.boardNumber)
      const leftOverNumbersSum = winnerBoard.board.filter((boardNumber) => !matchingNumbers.includes(boardNumber)).reduce((sum, current)=> sum + current,0)
      console.log(drawnNumber*leftOverNumbersSum)

      return true
    }

    return false
  })
}
first()

function second() {
  type BoardContext = {
    board: number[]
    matchingNumbers: {
      boardNumber: number
      x: number,
      y:number
    }[]
    answerThingy?: number
  }

  const boardContexts: BoardContext[] = boards.map((board) => ({ board, matchingNumbers: [] }))

  const winners = [] as BoardContext[]
  numbersDrawn.forEach((drawnNumber)=> {
    boardContexts.filter((boardContext) => !winners.includes(boardContext)).forEach((boardContext) => {
      const boardNumberIndex = boardContext.board.indexOf(drawnNumber)

      if(boardNumberIndex !== -1) {
        boardContext.matchingNumbers.push({
          boardNumber: drawnNumber,
          x: boardNumberIndex % boardSize,
          y: Math.floor(boardNumberIndex / boardSize)
        })

        for (let i = 0; i < boardSize; i++) {
          if(boardContext.matchingNumbers.filter((matchingNumber) => matchingNumber.y === i).length === 5 || boardContext.matchingNumbers.filter((matchingNumber) => matchingNumber.x === i).length === 5) {
            const matchingNumbers = boardContext.matchingNumbers.map((matchingNumber)=>matchingNumber.boardNumber)
            const leftOverNumbersSum = boardContext.board.filter((boardNumber) => !matchingNumbers.includes(boardNumber)).reduce((sum, current)=> sum + current,0)
            boardContext.answerThingy = drawnNumber*leftOverNumbersSum
            winners.push(boardContext)
          }
        }
      }
    })
  })

  console.log(winners.reverse()[0].answerThingy)
}
second()
