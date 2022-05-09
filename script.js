import { keyboardFragment, keyboardKeys } from "./keyboard_elements.js";

// creating non-keyboard elements
let container = document.createElement("div");
let title = document.createElement("p");
let about = document.createElement("p");
let combination = document.createElement("p");

container.classList.add("container");
document.body.appendChild(container);

title.classList.add("keyboard__title");
title.innerHTML = "Virtual Keyboard";
container.appendChild(title);

about.classList.add("keyboard__about", "text");
about.innerText = "For Windows OS";

combination.classList.add("keyboard__combination", "text");
combination.innerText = "LShift + LCtrl for switch language";

container.appendChild(about);
container.appendChild(combination);

// creating keyboard
class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem("language") === "ru" ? "ru" : "en";
  }

  init() {
    this.keyboard = document.createElement("div");
    this.keyboard.classList.add("keyboard");
    let keyboardRow = document.createElement("div");
    this.area = document.createElement("textarea");

    keyboardRow.classList.add("keyboard__row");
    this.area.classList.add("keyboard__area");
    this.area.setAttribute("id", "textarea");
    this.area.setAttribute("rows", "5");
    this.area.setAttribute("cols", "50");

    container.insertBefore(this.area, about);

    this.keyboard.appendChild(keyboardFragment);
    container.insertBefore(this.keyboard, about);

    this._switchLang(this.lang);
    this._addListeners();
  }

  _capsLockSwitch(shiftKey) {
    let upperIf = (this.caps && !shiftKey) || (!this.caps && shiftKey);
    let currCase = upperIf ? "toUpperCase" : "toLowerCase";

    Array.from(this.keyboard.querySelectorAll(".keyboard__key")).forEach(
      (key) => {
        if (!keyboardKeys[key.id].func) {
          if (key.id === "Backquote" && this.lang === "en") {
            key.textContent = shiftKey ? "~" : "`";
          } else if (key.id === "Minus" && this.lang === "en") {
            key.textContent = shiftKey ? "_" : "-";
          } else if (key.id === "Equal" && this.lang === "en") {
            key.textContent = shiftKey ? "+" : "=";
          } else if (key.id === "BracketLeft" && this.lang === "en") {
            key.textContent = shiftKey ? "{" : "[";
          } else if (key.id === "BracketRight" && this.lang === "en") {
            key.textContent = shiftKey ? "}" : "]";
          } else if (key.id === "Backslash" && this.lang === "en") {
            key.textContent = shiftKey ? "|" : "\\";
          } else if (key.id === "Semicolon" && this.lang === "en") {
            key.textContent = shiftKey ? ":" : ";";
          } else if (key.id === "Quote" && this.lang === "en") {
            key.textContent = shiftKey ? '"' : "'";
          } else if (key.id === "Comma" && this.lang === "en") {
            key.textContent = shiftKey ? "<" : ",";
          } else if (key.id === "Period" && this.lang === "en") {
            key.textContent = shiftKey ? ">" : ".";
          } else if (key.id === "Slash" && this.lang === "en") {
            key.textContent = shiftKey ? "?" : "/";
          } else if (key.id === "Slash" && this.lang === "ru") {
            key.textContent = shiftKey ? "," : ".";
          } else if (key.id === "Digit1") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "!" : "1";
            } else {
              key.textContent = shiftKey ? "!" : "1";
            }
          } else if (key.id === "Digit2") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "@" : "2";
            } else {
              key.textContent = shiftKey ? '"' : "2";
            }
          } else if (key.id === "Digit3") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "#" : "3";
            } else {
              key.textContent = shiftKey ? "№" : "3";
            }
          } else if (key.id === "Digit4") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "$" : "4";
            } else {
              key.textContent = shiftKey ? ";" : "4";
            }
          } else if (key.id === "Digit5") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "%" : "5";
            } else {
              key.textContent = shiftKey ? "%" : "5";
            }
          } else if (key.id === "Digit6") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "^" : "6";
            } else {
              key.textContent = shiftKey ? ":" : "6";
            }
          } else if (key.id === "Digit7") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "&" : "7";
            } else {
              key.textContent = shiftKey ? "?" : "7";
            }
          } else if (key.id === "Digit8") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "*" : "8";
            } else {
              key.textContent = shiftKey ? "*" : "8";
            }
          } else if (key.id === "Digit9") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? "(" : "9";
            } else {
              key.textContent = shiftKey ? "(" : "9";
            }
          } else if (key.id === "Digit0") {
            if (this.lang === "en") {
              key.textContent = shiftKey ? ")" : "0";
            } else {
              key.textContent = shiftKey ? ")" : "0";
            }
          } else {
            key.textContent = key.textContent[currCase]();
          }
        }
      }
    );
  }

  _arrowKeyAction(letter) {
    let start = this.area.selectionStart;

    this.area.value =
      this.area.value.slice(0, start) +
      letter +
      this.area.value.slice(this.area.selectionEnd);
    this.area.selectionStart = start + letter.length;
    this.area.selectionEnd = this.area.selectionStart;
  }

  _writeText(letter) {
    let start = this.area.selectionStart;

    this.area.value =
      this.area.value.slice(0, start) +
      letter +
      this.area.value.slice(this.area.selectionEnd);
    this.area.selectionStart = start + letter.length;
    this.area.selectionEnd = this.area.selectionStart;
  }

  _pressDel() {
    console.log("Del pressed");
    if (this.area.selectionStart !== this.area.selectionEnd) {
      this._writeText("");
    } else {
      let start = this.area.selectionStart;

      this.area.value =
        this.area.value.slice(0, start) + this.area.value.slice(start + 1);

      this.area.selectionStart = start;
      this.area.selectionEnd = this.area.selectionStart;
    }
  }

  _pressBackspace() {
    console.log("Backspace pressed");
    if (this.area.selectionStart !== this.area.selectionEnd) {
      this._writeText("");
    } else {
      let start = Math.max(0, this.area.selectionStart - 1);
      console.log(start);

      this.area.value =
        this.area.value.slice(0, start) +
        this.area.value.slice(this.area.selectionEnd);

      this.area.selectionStart = start;
      this.area.selectionEnd = this.area.selectionStart;
    }
  }

  _addListeners() {
    document.addEventListener("keydown", (event) => {
      event.stopImmediatePropagation();

      let key = document.getElementById(event.code);
      if (!key) {
        event.preventDefault();
        return;
      }

      if (event.code === "CapsLock" && !event.repeat) {
        event.preventDefault();
        this.caps = !this.caps;
        if (this.caps) {
          key.classList.add("active");
        } else {
          key.classList.remove("active");
        }
        this._capsLockSwitch(event.shiftKey);
      } else if (event.metaKey) {
        console.log("test");
        key.classList.add("active");
      } else {
        console.log(event.code);
        key.classList.add("active");
        if (event.shiftKey && event.altKey && !event.repeat) {
          event.preventDefault();
          this.lang = this.lang === "ru" ? "en" : "ru";
          console.log(this.lang);
          this._switchLang(this.lang);
          localStorage.setItem("language", this.lang);
        } else if (!keyboardKeys[event.code].func) {
          event.preventDefault();
          this._writeText(key.textContent);
        } else if (
          (event.code === "ShiftRight" || event.code === "ShiftLeft") &&
          !event.repeat
        ) {
          event.preventDefault();
          this._capsLockSwitch(event.shiftKey);
        } else if (event.key === "Tab") {
          event.preventDefault();
          this._writeText("\t");
        } else if (event.code === "Enter") {
          event.preventDefault();
          this._writeText("\n");
        } else if (
          event.code === "ArrowLeft" ||
          event.code === "ArrowDown" ||
          event.code === "ArrowRight" ||
          event.code === "ArrowUp"
        ) {
          event.preventDefault();
          this._arrowKeyAction(key.textContent);
        } else if (event.code === "Backspace") {
          event.preventDefault();
          this._pressBackspace();
        } else if (event.code === "Delete") {
          event.preventDefault();
          this._pressDel();
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      event.stopImmediatePropagation();

      let key = document.getElementById(event.code);
      if (!key) {
        event.preventDefault();
        return;
      }

      if (event.code !== "CapsLock") {
        key.classList.remove("active");
        if (event.code === "ShiftRight" || event.code === "ShiftLeft") {
          event.preventDefault();
          this._capsLockSwitch(event.shiftKey);
        }
      }
    });

    this.keyboard.addEventListener("mousedown", (event) => {
      this.area.focus();
      let keyDown = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        code: event.target.id,
      });
      document.dispatchEvent(keyDown);
    });

    this.keyboard.addEventListener("mouseup", (event) => {
      this.area.focus();
      let keyUp = new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: true,
        code: event.target.id,
      });
      document.dispatchEvent(keyUp);
    });
  }
  _switchLang(language) {
    Array.from(this.keyboard.querySelectorAll(".keyboard__key")).forEach(
      (key) => {
        key.textContent = keyboardKeys[key.id][language];
      }
    );
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
