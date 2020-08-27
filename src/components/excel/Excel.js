import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber'
import {updateDate} from '@/redux/actions'
import {preventDefault} from '@core/utils'

export class Excel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    // Инициализируем компоненты и перезаписываем this.components
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }

    this.store.dispatch(updateDate())

    // Если какой-то компонент следит за отдельным полем в store то мы на него подписыаемся
    this.subscriber.subscribeComponents(this.components)

    // Только после того, как отрисовали в dom все компоненты
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}
