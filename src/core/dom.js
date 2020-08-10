class Dom {
  constructor(selector) {
    // #app, event.target
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    // Если html не строка, то возвращаем то же самое
    return this.$el.outerHTML.trim()
  }

  clear() {
    // Очищает внутри селектора
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return this.$el.querySelector(selector) ? $(this.$el.querySelector(selector)) : null
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    // for (const prop in styles) {
    // if ({}.hasOwnProperty.call(styles, prop)) {
    //   // Проверка, т.к. for-in пробегает еще и по прототипу
    //   console.log(prop)
    //   console.log(styles[prop])
    //   this.$el.style[prop] = styles[prop]
    // }
    // }
    Object.keys(styles).forEach(prop => {
      this.$el.style[prop] = styles[prop]
    })
    return this
  }

  addClass(className = '') {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className = '') {
    this.$el.classList.remove(className)
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

/*
* Выносим отдельно, чтобы не создавать элементы не вызывая функцию $
* create лежит в прототипе функции $
* А когда вызываем $ то возвращается экземпляр объекта Dom
* у него другой __proto__ (__proto__ потому что экземпляр объекта)
*/

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
