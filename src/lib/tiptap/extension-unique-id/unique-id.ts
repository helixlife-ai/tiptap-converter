'use strict';

// TODO: the current plugin is developed based on the ID plugin of Tiptap and is still in development.
// It is being rewritten due to issues with the ID plugin provided by Tiptap and considerations for extensibility.
import { Extension } from '@tiptap/core';
import {
  findChildren,
  findChildrenInRange,
  combineTransactionSteps,
  getChangedRanges,
} from '@tiptap/core';
import { Node, Fragment, Slice } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { v4 as uuidv4 } from 'uuid';

function o<T>(array: T[]): T[] {
  return array.filter((item, index) => array.indexOf(item) === index);
}

let draggedElement: any = null;
let isPasted: boolean = false;

const uniqueIDExtension = Extension.create({
  name: 'uniqueID',
  priority: 10000,
  addOptions: () => ({
    attributeName: 'id',
    types: [],
    generateID: () => uuidv4(),
    filterTransaction: null,
  }),
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (attributes) =>
              attributes[this.options.attributeName]
                ? {
                    [`data-${this.options.attributeName}`]:
                      attributes[this.options.attributeName],
                  }
                : {},
          },
        },
      },
    ];
  },
  onCreate() {
    if (
      this.editor.extensionManager.extensions.find(
        (extension) => extension.name === 'collaboration'
      )
    ) {
      return;
    }
    const { view, state } = this.editor;
    const { tr, doc } = state;
    const { types, attributeName, generateID } = this.options;
    findChildren(
      doc,
      (node) =>
        types.includes(node.type.name) && node.attrs[attributeName] === null
    ).forEach(({ node, pos }) => {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        [attributeName]: generateID(),
      });
    });
    tr.setMeta('addToHistory', false);
    view.dispatch(tr);
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('uniqueID'),
        options: this.options,
        appendTransaction(transactions, oldState, newState) {
          const docChanged =
            transactions.some((transaction) => transaction.docChanged) &&
            !oldState.doc.eq(newState.doc);
          const filterTransaction =
            this.options?.filterTransaction &&
            transactions.some((transaction) => {
              return !(
                this.options.filterTransaction?.call(
                  this.options,
                  transaction
                ) ?? false
              );
            });
          const ySync = transactions.find((transaction) =>
            transaction.getMeta('y-sync$')
          );

          if (ySync) {
            return;
          }

          if (!docChanged || filterTransaction) {
            return;
          }

          const { tr } = newState;
          const { types, attributeName, generateID } = this.options;
          const combinedTransaction = combineTransactionSteps(
            oldState.doc,
            transactions
          );
          const { mapping } = combinedTransaction;

          getChangedRanges(combinedTransaction).forEach(({ newRange }) => {
            const nodes = findChildrenInRange(newState.doc, newRange, (node) =>
              types.includes(node.type.name)
            );
            const ids = nodes
              .map(({ node }) => node.attrs[attributeName])
              .filter((id) => id !== null);

            nodes.forEach(({ node, pos }, index) => {
              const id = mapping.mapResult(pos).deleted
                ? null
                : tr.doc.nodeAt(pos)?.attrs[attributeName];

              if (id === null) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
              } else {
                const nextNode = nodes[index + 1];
                if (nextNode && node.content.size === 0) {
                  tr.setNodeMarkup(nextNode.pos, undefined, {
                    ...nextNode.node.attrs,
                    [attributeName]: id,
                  });
                  ids[index + 1] = id;
                  if (nextNode.node.attrs[attributeName]) {
                    return;
                  }
                  const newId = generateID();
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    [attributeName]: newId,
                  });
                  ids[index] = newId;
                }
                const uniqueIds = o(ids);
                const result = mapping.invert().mapResult(pos);
                if (result.deleted && uniqueIds.includes(id)) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    [attributeName]: generateID(),
                  });
                }
              }
            });
          });

          return tr.steps.length
            ? tr.setStoredMarks(oldState.tr.storedMarks)
            : tr;
        },
      }),
    ];
  },
  view(props: any) {
    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;
      draggedElement = props.dom.parentElement?.contains(target)
        ? props.dom.parentElement
        : null;
    };

    window.addEventListener('dragstart', handleDragStart);

    return {
      destroy() {
        window.removeEventListener('dragstart', handleDragStart);
      },
    };
  },
  props: {
    handleDOMEvents: {
      drop: (view, event: DragEvent) => {
        const target = event.target as HTMLElement;
        const dataTransfer = event.dataTransfer;
        if (
          draggedElement === view.dom.parentElement &&
          dataTransfer?.effectAllowed !== 'copyMove' &&
          dataTransfer?.effectAllowed !== 'copy'
        ) {
          draggedElement = null;
          isPasted = true;
        }
        return false;
      },
      paste: () => {
        isPasted = true;
        return false;
      },
    },
    transformPasted(slice: Slice) {
      if (!isPasted) {
        return slice;
      }
      const { types, attributeName } = this.options;

      const transformContent = (content: Fragment) => {
        const transformedNodes: Node[] = [];
        content.forEach((node) => {
          if (node.isText) {
            transformedNodes.push(node);
          } else if (!types.includes(node.type.name)) {
            transformedNodes.push(node.copy(transformContent(node.content)));
          } else {
            const newNode = node.type.create(
              { ...node.attrs, [attributeName]: null },
              transformContent(node.content),
              node.marks
            );
            transformedNodes.push(newNode);
          }
        });
        return Fragment.from(transformedNodes);
      };

      isPasted = false;
      return new Slice(
        transformContent(slice.content),
        slice.openStart,
        slice.openEnd
      );
    },
  },
});

export const UniqueID = uniqueIDExtension;
export default uniqueIDExtension;
