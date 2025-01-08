'use client';

import './styles.scss'
import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'

import Document from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';

import Code from '@tiptap/extension-code'
import { CodeBlock } from '@tiptap/extension-code-block'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Typography from '@tiptap/extension-typography'

import Link from '@tiptap/extension-link';

import Image from '@tiptap/extension-image'

import ListItem from '@tiptap/extension-list-item'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import { Blockquote } from '@tiptap/extension-blockquote'


import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { HardBreak } from '@tiptap/extension-hard-break'

import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { History } from '@tiptap/extension-history'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'

import { Callout } from '@/lib/tiptap/extension-callout';

import { result } from './convertToTiptapContent';


import MenuBar from './MenuBar'

const Editor = () => {
  const extensions = [
    Document,
  
    // Common blocks
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    Underline,
    Subscript,
    Superscript,
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({ multicolor: true }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
  
    HorizontalRule,
    Blockquote,
    CodeBlock,
    Code,
    HardBreak,

    Image,
    Link,

    // List
    BulletList,
    ListItem,
    OrderedList,
    TaskList,
    TaskItem.configure({ HTMLAttributes: { class: 'task-item' } }),

    // Table
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,

    // markdown
    Typography,

    Dropcursor,
    Gapcursor,
    History,
    Callout,

  ]
  
  const editor = useEditor({
    extensions,
    content: result,
  })

  return (
    <div className='p-5'>
       {editor && <MenuBar editor={editor} />}
        <EditorContent editor={editor} className='pt-10'/>
    </div>
  )
}

export default Editor;