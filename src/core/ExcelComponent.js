import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // хук до метода init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Как во вью
  // Уведомляем слушателя про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    // Добавляем в массив функции, которые отписываются от event
    this.unsubscribers.push(unsub)
  }

  // Инициализируем компонент
  // Добавляем дом слушатели
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
