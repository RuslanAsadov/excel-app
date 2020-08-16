export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className).focus()
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  moveTo(direction, $root) {
    const id = this.current.id(true)
    if (direction === 'up' && id.row > 0) {
      id.row--
    }
    if (direction === 'right') {
      id.col++
    }
    if (direction === 'down') {
      id.row++
    }
    if (direction === 'left' && id.col > 0) {
      id.col--
    }
    const $target = $root.find(`[data-id="${id.row}:${id.col}"]`)
    $target.focus()
    this.select($target)
  }
}
