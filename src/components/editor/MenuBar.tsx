import './MenuBar.scss'

import React, { Fragment } from 'react'
import { 
  Redo2,
  Undo2,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Highlighter,
  Heading1,
  Heading2,
  Pilcrow,
  List,
  ListOrdered,
  ListTodo,
  TextQuote,
  SeparatorHorizontal,
  WrapText,
  Eraser
 } from 'lucide-react'
 import type { Editor } from '@tiptap/core'

const MenuItem = ({
  icon: Icon, title, action, isActive,
}: any) => (
  <button
    className={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <Icon />
  </button>
)

const MenuBar =  ({ editor }: { editor: Editor }) => {
  const items = [
    {
      icon: Undo2,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: Redo2,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
    {
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: Strikethrough,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: Code,
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: Highlighter,
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: Heading1,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: Heading2,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: Pilcrow,
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: List,
      title: 'Bullet list',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      title: 'Ordered list',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: ListTodo,
      title: 'Task list',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: Code,
      title: 'Code block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: TextQuote,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: SeparatorHorizontal,
      title: 'Horizontal rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: WrapText,
      title: 'Hard break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: Eraser,
      title: 'Clear format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks()
        .run(),
    },
    {
      type: 'divider',
    },
  ]

  return (
    <div className="flex gap-x-3">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? <div className="divider" /> : <MenuItem {...item} />}
        </Fragment>
      ))}
    </div>
  )
}

export default MenuBar;