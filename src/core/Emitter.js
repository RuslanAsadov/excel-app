// Как во вью
export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // 'formula:done'
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// Example

// const emitter = new Emitter()
// const unsub = emitter.subscribe('ruslan', (data) => console.log(data))
// emitter.emit('ruslan', 42)
// unsub()
// emitter.emit('ruslan', 43) // не выведет
