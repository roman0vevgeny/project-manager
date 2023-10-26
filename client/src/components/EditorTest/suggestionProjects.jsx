import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import { PluginKey } from '@tiptap/pm/state'
import ProjectList from './ProjectList'

export const suggestionProjects = (projects, id) => {
  console.log('projects at suggestionProjects: ', projects)
  return {
    items: ({ query }) => {
      const filteredProjects = projects
        .map((project) => project.name)
        .filter((project) => project.toLowerCase().startsWith(query))
      return filteredProjects
    },
    char: '#',
    pluginKey: new PluginKey('projectsMention'),
    render: () => {
      let component
      let popup

      return {
        onStart: (props) => {
          component = new ReactRenderer(ProjectList, {
            props: {
              ...props,
              id: id,
              query: props.query,
              // projects: projects,
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
