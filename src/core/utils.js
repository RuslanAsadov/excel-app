// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    // Хак js чтобы не проверять рекурсивно. Работает для не сложных объектов (типо без new Date, Map и тд)
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';')
}

// Функция высокого порядка, которая возвращает функцию
export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      // после того, как прошло wait миллисекунд и если вдруг следующая функция успела проскочить, то ее удаляем
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
      // fn(...args)
    }
    // Если уже была вызвана и еще не прошло wait милисекунд, то больше не вызываем предыдущую
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event) {
  event.preventDefault()
}
