import {Page} from '@core/Page'
import {сreateStore} from '@core/сreateStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from '@core/utils'
import {normalizeInitialState} from '@/redux/initialState'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString()

    const state = storage(storageName(params))
    const initialState = normalizeInitialState(state)
    const store = сreateStore(rootReducer, initialState)

    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    // Запись в localstorage
    store.subscribe(stateListener)

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
  }
}
