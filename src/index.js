import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {сreateStore} from '@core/сreateStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from '@/redux/initialState';
import './sass/index.sass'

const store = сreateStore(rootReducer, initialState)

const stateListener = debounce(state => {
  console.log('App state', state)
  storage('excel-storage', state)
}, 300)

// Запись в localstorage
store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
