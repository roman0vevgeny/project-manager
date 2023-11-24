import styles from './BubbleMenu.module.scss'
import { BubbleMenu } from '@tiptap/react'
import React from 'react'
import LinkModal from '../EditorTipTapMain/LinkModal'
import {
  Bold as BoldIcon,
  Italic,
  Strike,
  Code as CodeIcon,
  Link as LinkIcon,
  UnLink,
} from '../UI/Icons'

const BubbleMenuComponent = ({
  editor,
  setLink,
  showLinkModal,
  setShowLinkModal,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className={styles.menu}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold') ? styles.isActive : styles.menuButton
        }>
        {BoldIcon()}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic') ? styles.isActive : styles.menuButton
        }>
        {Italic()}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive('strike') ? styles.isActive : styles.menuButton
        }>
        {Strike()}
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={
          editor.isActive('code') ? styles.isActive : styles.menuButton
        }>
        {CodeIcon()}
      </button>
      <div className='flex w-[1px] mx-[10px] h-[30px] bg-[var(--stroke)]'></div>
      <button
        onClick={setLink}
        className={
          editor.isActive('link') ? styles.isActive : styles.menuButton
        }>
        {LinkIcon()}
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className={
          editor.isActive('link') ? styles.isActive : styles.menuButton
        }>
        {UnLink()}
      </button>
      {showLinkModal && (
        <div className='absolute top-0 -left-1'>
          <LinkModal
            editor={editor}
            show={showLinkModal}
            href={editor.getAttributes('link').href}
            onClose={() => setShowLinkModal(false)}
            onConfirm={(url) => {
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
              }
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run()
            }}
            onCancel={() => {}}
          />
        </div>
      )}
    </BubbleMenu>
  )
}

export default BubbleMenuComponent
