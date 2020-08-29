import {storage} from '@core/utils'

function storageName(param) {
  return 'excel:' + param
}

// Класс, взаимодействует с localstorage. Передаем как частную имплементацию client в StateProcessor
export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    // return Promise.resolve(storage(this.name))

    // Эмуляция асинхронного кода
    return new Promise(resolve => {
      const state = storage(this.name)
      setTimeout(() => {
        resolve(state)
      }, 1300)
    })
  }
}
