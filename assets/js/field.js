"use strict"
import * as sound from "./sound.js"

const GHOST_SIZE = 190
const PUMKIN_SIZE = 100

export default class Field {
  constructor(ghostCount, pumkinCount) {
    this.ghostCount = ghostCount
    this.pumkinCount = pumkinCount
    this.field = document.querySelector(".game-field")
    this.fieldRect = this.field.getBoundingClientRect()
    this.field.addEventListener("click", this.onClick)
  }
  onClickItem(onClickItem) {
    this.onClickItem = onClickItem
  }

  makeGame() {
    this.field.innerHTML = ""
    const pointItem = {
      className: "game-point",
      count: this.ghostCount,
      imgSrc: "/assets/img/ghost.png",
      imgAlt: "ghost",
      padding: GHOST_SIZE,
    }
    const trapItem = {
      className: "game-trap",
      count: this.pumkinCount,
      imgSrc: "/assets/img/pumpkin.png",
      imgAlt: "pumpkin",
      padding: PUMKIN_SIZE,
    }
    this._makeItem(pointItem)
    this._makeItem(trapItem)
  }

  _makeItem(objItem) {
    const x1 = 0
    const y1 = this.field.offsetTop
    const x2 = this.fieldRect.width - objItem.padding
    const y2 = this.fieldRect.height - objItem.padding
    for (let i = 0; i < objItem.count; i++) {
      const item = document.createElement("img")
      item.setAttribute("class", objItem.className)
      item.setAttribute("src", objItem.imgSrc)
      item.setAttribute("alt", objItem.imgAlt)
      const x = randomLocation(x1, x2)
      const y = randomLocation(y1, y2)
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      this.field.appendChild(item)
    }
  }

  onClick = (event) => {
    const target = event.target
    if (target.alt === "ghost") {
      target.remove()
      sound.playPoint()
      this.onClickItem && this.onClickItem("ghost")
    } else if (target.alt === "pumpkin") {
      sound.playTrap()
      this.onClickItem && this.onClickItem("pumpkin")
    }
  }
}

function randomLocation(min, max) {
  return Math.random() * (max - min) + min
}
