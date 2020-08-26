import {$} from '@/core/dom.js'
export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.clientX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.clientY - coords.bottom
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      if (value) {
        if (type === 'col') {
          $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(col => {
            $(col).css({width: value + 'px'})
          })
        } else {
          $parent.css({height: value + 'px'})
        }
        resolve({
          type,
          id: $parent.data[type],
          value
        })
      }

      document.onmousemove = null
      document.onmouseup = null

      $resizer.css({
        opacity: null,
        right: 0,
        bottom: 0
      })
    }
  })
}

