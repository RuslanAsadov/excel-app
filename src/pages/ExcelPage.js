import {Page} from '@core/page/Page'
import {сreateStore} from '@core/store/сreateStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '@/redux/initialState'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {StateProcessor} from '@core/page/StateProcessor'
import {LocalStorageClient} from '@/shared/LocalStorageClient'

export class ExcelPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null

    // Принцип SOLID Dependency inversion principle
    // Взаимодействуем с абстракциями стейта
    this.processor = new StateProcessor(
        // Передаем то, с чем работаем (в данном случае localStorage)
        new LocalStorageClient(this.params)
    )
  }

  async getRoot() {
    // Может быть асинхронным
    const state = await this.processor.get()
    const initialState = normalizeInitialState(state)
    const store = сreateStore(rootReducer, initialState)

    // Запись в localstorage
    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
