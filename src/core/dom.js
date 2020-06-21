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
