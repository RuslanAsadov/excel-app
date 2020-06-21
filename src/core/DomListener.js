import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // this === component (так как вызываем component, а он наследуется от этих классов)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not implemented in ${name} Component`)
      }
      /* bind т.к. this будет dom нодой (this.$root.on(...))
       * перезаписываем в this[method] т.к. bind возвращает новую функцию
       * для удаления слушателя нужно передать ту же самую функцию
       * (часто в фреймворках)
      */
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

// input => onInput
