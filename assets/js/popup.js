"use strict"

export default class PopUp {
  constructor() {
    this.blindBg = document.querySelector(".blind")
    this.popupTile = document.querySelector(".popup-title")
    this.popupBtn = document.querySelector(".popup-btn")
    this.popupBtn.addEventListener("click", () => {
      this.onClick && this.onClick()
      this.hide()
    })
  }

  setClickListener(onClick) {
    this.onClick = onClick
  }

  updateText(mesege) {
    this.popupTile.innerText = mesege
  }

  changeIcon(icon) {
    this.popupBtn.innerHTML = icon
  }

  show() {
    this.blindBg.classList.remove("disappear")
  }

  hide() {
    this.blindBg.classList.add("disappear")
  }
}
