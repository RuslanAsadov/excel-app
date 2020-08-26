import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    const initialState = defaultStyles
    this.initState(initialState)
  }

  get template() {
    // Сначала рисуется чистый тулбар, но потом подгружаются данные из стора и тулбар становится корректным
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    // работает без задержки debounce так как подписываемся в другом месте (StoreSubscriber)
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
