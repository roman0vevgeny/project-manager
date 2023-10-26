import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { PluginKey } from '@tiptap/pm/state'
import MentionList from './MentionList'

export default (users, id) => {
  // console.log('users: ', users)
  // console.log('id: ', id)
  return {
    items: ({ query }) => {
      return users
        .map((user) => user.name)
        .filter((user) => user.toLowerCase().startsWith(query))
      // .slice(0, 5)
    },
    pluginKey: new PluginKey('usersMention'),
    char: '@',
    render: () => {
      let component
      let popup

      return {
        onStart: (props) => {
          component = new ReactRenderer(MentionList, {
            props: {
              ...props,
              id: id,
            },
            editor: props.editor,
          })

          if (!props.clientRect) {
            return
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          })
        },

        onUpdate(props) {
          component.updateProps(props)

          if (!props.clientRect) {
            return
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          })
        },

        onSelectionUpdate(props) {
          component.updateProps(props)
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide()

            return true
          }

          return component.ref?.onKeyDown(props)
        },

        onExit() {
          popup[0].destroy()
          component.destroy()
        },
      }
    },
  }
}
