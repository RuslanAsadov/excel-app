import {defaultStyles} from '@/constants'
import {toInlineStyles} from '@/core/utils';
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  // Замыкаем
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[id] }) || toInlineStyles(defaultStyles)
    return `
      <div 
        class="cell"
        contenteditable 
        data-type="cell"
        data-col="${col}" 
        data-id="${id}" 
        data-value="${data || ''}"
        style="${styles}; width: ${width}"
      >${parse(data) || ''}</div>
    `
  }
}

function toColumn({col, index, width}) {
  return `
    <div 
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content, state = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const id = index ? `data-row="${index}"` : ''
  return `
    <div 
      class="row" 
      data-type="resizable" 
      ${id}
      style="height: ${getHeight(state, index)}"
    >
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div> 
    </div>
  `
}

function toChar(_, index) {
  // _ пишем, чтобы обозначить то, что мы его не используем
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return (col, index) => {
    return {col, index, width: getWidth(state, index)}
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute colls count
  const rows = []

  const cols = new Array(colsCount)
      .fill('') // Заменяем каждый элемент на ""
      .map(toChar) // Заменяем каждый элемент на нужную букву
      .map(withWidthFrom(state.colState)) // для определенного индекса заранее высчитываем значение и возвращаем функцию. Конечный мап вернет объект
      .map(toColumn) // оборачиваем в див column
      .join('') // превращаем в строку

  rows.push(createRow(null, cols)) // Создаем первую строку с буквами

  for (let row = 0; row < rowsCount; row++) { // Проходимся п количеству строк
    const cells = new Array(colsCount)
        .fill('') // Заменяем каждый элемент на ""
        .map(toCell(state, row)) // Вернет функцию, в которой замкнут индекс строки. map вставит в нее индекс колонки
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
