export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    // Если не реализован, а вызывается у родителя
    throw new Error('Method "getRoot" should be implemented')
  }

  afterRender() {}

  destroy() {}
}
