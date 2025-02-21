import { Node } from '@tiptap/core';

// TODO: refine this component
export const Callout = Node.create({
  name: 'callout',
  content: 'block+',
  group: 'block',
  defining: true,
  addAttributes() {
    return {
      textColor: {
        default: 'black',
        parseHTML: (element) => element.style.color,
        renderHTML: (attributes) => ({
          style: `color:${attributes.textColor};`,
        }),
      },
      borderColor: {
        default: 'black',
        parseHTML: (element) => element.style.borderColor,
        renderHTML: (attributes) => ({
          style: `border-color:${attributes.borderColor};`,
        }),
      },
      textAlign: {
        default: 'left',
        parseHTML: (element) => element.style.textAlign,
        renderHTML: (attributes) => ({
          style: `text-align:${attributes.textAlign};`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { class: 'callout', ...HTMLAttributes }, 0];
  },
});
