import { Node } from '@tiptap/core';

export const Block = Node.create({
  name: 'block',
  content: 'block+',
  group: 'block',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'div',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes }, 0];
  },
});
