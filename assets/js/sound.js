"use strict"

const pointSound = new Audio("/assets/sound/point_pull.mp3")
const trapSound = new Audio("/assets/sound/trap_pull.mp3")
const winSound = new Audio("/assets/sound/game_win.mp3")
const alertSound = new Audio("/assets/sound/alert.wav")
const bgm = new Audio("/assets/sound/bg.mp3")

const muteBtn = document.querySelector("#mute")

export function playPoint() {
  playSound(pointSound)
}

export function playTrap() {
  playSound(trapSound)
}

export function playWin() {
  playSound(winSound)
}

export function playLose() {
  playSound(alertSound)
}

export function loopBackground() {
  muteBtn.classList.remove("chose")
  playSound(bgm)
}

export function stopBackground() {
  stopSound(bgm)
}

muteBtn.addEventListener("click", () => {
  muteAble()
})

export function muteAble() {
  if (muteBtn.classList.contains("chose")) {
    muteBtn.classList.remove("chose")
    loopBackground()
  } else {
    muteBtn.classList.add("chose")
    stopBackground()
  }
}

function playSound(sound) {
  if (sound === bgm) {
    sound.addEventListener(
      "ended",
      function () {
        this.currentTime = 0
        this.play()
      },
      false
    )
  }
  sound.play()
}

function stopSound(sound) {
  sound.pause()
}
