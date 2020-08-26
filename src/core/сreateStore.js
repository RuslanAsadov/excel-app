// Через функцию чтобы сделать "приватные" переменные state и listeners
// Работаем через замыкания
export function сreateStore(rootReducer, initialState = {}) {
  // если initialState === null то пустой объект
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    // Подписка на изменения всего стейта
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      // Чтобы не было мутирования
      return JSON.parse(JSON.stringify(state))
    }
  }
}
