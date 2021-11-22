"use strict"

import PopUp from "./popup.js"
import * as sound from "./sound.js"
import { GameBilder, Reson } from "./game.js"

const screenBanner = new PopUp()
const game = new GameBilder()
  .withGameLimitTime(20)
  .withGamePointCount(10)
  .withGameLititTime(8)
  .build()

game.setStateListener((reason) => {
  console.log(reason)
  let popupTitile
  switch (reason) {
    case Reson.cancel:
      sound.playLose()
      popupTitile = "Restart Game?"
      break
    case Reson.win:
      sound.playWin()
      popupTitile = "You Win🎉"
      break
    case Reson.lose:
      sound.playLose()
      popupTitile = "You Lose🎃"
      break
    default:
      throw new Error("unknown reason")
  }
  sound.stopBackground()
  screenBanner.updateText(popupTitile)
  screenBanner.changeIcon(`<i class="fas fa-undo"></i>`)
  screenBanner.show()
})

screenBanner.setClickListener(() => {
  game.start()
})
