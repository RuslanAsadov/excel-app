const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, col) {
  return `
    <div class="cell" contenteditable data-col="${col}">
      <div class="resize-line"></div>
    </div>
  `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute colls count
  const rows = []

  const cols = new Array(colsCount)
      .fill('') // Заменяем каждый элемент на ""
      .map(toChar) // Заменяем каждый элемент на нужную букву
      .map(toColumn) // оборачиваем в див column
      .join('') // превращаем в строку

  rows.push(createRow(null, cols)) // Создаем первую строку с буквами

  for (let i = 0; i < rowsCount; i++) { // Проходимся п количеству строк
    const cells = new Array(colsCount)
        .fill('') // Заменяем каждый элемент на ""
        .map(toCell) // Превращаем все элементы в ячейки
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
