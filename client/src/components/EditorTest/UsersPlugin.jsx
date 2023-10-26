import React, { useEffect } from 'react'
import { Extension } from '@tiptap/core'
import { Suggestion } from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'

const UsersView = ({ items, index }) => {
  const ref = React.useRef(null)

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()

      const diff = event.key === 'ArrowDown' ? +1 : -1
      const element = ref.current
      const currentIndex = index()
      const maxIndex = items().length - 1
      let nextIndex = currentIndex + diff

      if (nextIndex < 0) {
        nextIndex = maxIndex
      }

      if (nextIndex > maxIndex) {
        nextIndex = 0
      }

      if (element) {
        const listElements = Array.from(element.querySelectorAll('li'))
        listElements[nextIndex].focus()
      }
    }

    return false
  }

  return (
    <ul ref={ref} onKeyDown={onKeyDown}>
      {items().map((item, i) => (
        <li key={i} tabIndex={i}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}

const UsersPlugin = Extension.create({
  name: 'insertMenu',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '@',
        command: ({ editor, range, props }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent(`@${props.name}`)
            .run()
        },
        items: ({ query }) => {
          const users = this.options.users

          return users.filter((user) =>
            user.name.toLowerCase().startsWith(query.toLowerCase())
          )
        },
        render: () => {
          let component, popup
          return {
            onStart: (props) => {
              component = new ReactRenderer(UsersView, {
                props,
                editor: props.editor,
              })
              popup = tippy(props.editor.options.element, {
                getReferenceClientRect: props.clientRect,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              })
            },
            onUpdate: (props) => {
              component.updateProps(props)
              popup.setProps({
                getReferenceClientRect: props.clientRect,
              })
            },
            onKeyDown: ({ event }) => {
              if (event.key === 'Escape') {
                popup.hide()
                return true
              }
              if (component.ref) return component.ref.onKeyDown(event)
              else return true
            },
            onExit: () => {
              component.destroy()
              popup.destroy()
            },
          }
        },
      }),
    ]
  },
})

export default UsersPlugin

// useEffect(() => {
//   return () => {
//     // Вызываем destroy() на редакторе при размонтировании компонента
//     editor.destroy()
//   }
// }, [])
