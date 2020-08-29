import {debounce} from '@core/utils'

// Класс, позволяющий взаимодействовать с client (В данном случае localStorage, но можно заменить например на сервер)
export class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
