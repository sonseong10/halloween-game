"use strict"
import Field from "./field.js"
import * as sound from "./sound.js"

const POINT = 100

let totalPoint = 0

export const Reson = Object.freeze({
  cancel: "cancel",
  win: "win",
  lose: "lose",
})

export class GameBilder {
  withGameLimitTime(time) {
    this.limitTime = time
    return this
  }
  withGamePointCount(count) {
    this.pointCount = count
    return this
  }
  withGameLititTime(count) {
    this.trapCount = count
    return this
  }

  build() {
    console.log(this)
    return new Game(
      this.limitTime, //
      this.pointCount,
      this.trapCount
    )
  }
}

class Game {
  constructor(limitTime, pointCount, trapCount) {
    this.limitTime = limitTime
    this.pointCount = pointCount
    this.trapCount = trapCount

    this.score = document.querySelector(".score-total")
    this.timerText = document.querySelector(".timer")
    this.gameBtn = document.querySelector(".popup-btn")

    this.gameField = new Field(pointCount, trapCount)
    this.gameField.onClickItem(this.onClickItem)

    this.gameBtn.addEventListener("click", () => {
      this.resetPoint()
      this.startTimer()
      this.start()
    })
    this.pauseBtn = document.querySelector("#pause")
    this.pauseBtn.addEventListener("click", () => {
      this.stopTimer()
      this.stop(Reson.cancel)
    })

    this.timer = undefined
  }

  setStateListener(onState) {
    this.onState = onState
  }

  start() {
    this.score.innerText = "0"
    this.gameField.makeGame()
    sound.loopBackground()
  }

  stop(reason) {
    this.resetPoint()
    this.stopTimer()

    this.onState && this.onState(reason)
  }

  startTimer() {
    let timeSec = this.limitTime
    const timeOut = 0
    this._updateTimer(timeSec)
    this.timer = setInterval(() => {
      if (timeSec <= timeOut) {
        this.stop(Reson.lose)
        return
      }
      this._updateTimer(--timeSec)
    }, 1000)
  }

  _updateTimer(time) {
    const min = Math.floor(time / 60)
    const sec = time % 60
    this.timerText.innerText = `${min}:${sec}`
  }

  stopTimer() {
    clearInterval(this.timer)
  }

  onClickItem = (item) => {
    if (item === "ghost") {
      addPoint()
      this.score.innerText = totalPoint
      this.score.value = totalPoint
      if (this.score.value === this.pointCount * POINT) {
        this.stop(Reson.win)
      }
    } else if (item === "pumpkin") {
      this.stop(Reson.lose)
    }
  }

  resetPoint() {
    this.score.value = 0
    totalPoint = 0
  }
}

function addPoint() {
  totalPoint = totalPoint + POINT
  return totalPoint
}
