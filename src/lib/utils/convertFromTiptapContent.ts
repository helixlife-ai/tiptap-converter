import {
  TProperty,
  TextRunStyle,
  TBlock,
  TNode,
  TMark,
  TextElement,
} from './types';

function getParentId<T>(childId: T, rootNode: TNode): T | undefined {
  function traverse(node: TNode, parentId: T | undefined): T | undefined {
    if (node.attrs && node.attrs.id === childId) {
      return parentId;
    }
    if (node.content) {
      for (const child of node.content) {
        const parent_id = ['listItem', 'tableRow'].includes(node.type)
          ? parentId
          : node.attrs.id;
        const result = traverse(child, node.attrs ? parent_id : null);
        if (result) {
          return result;
        }
      }
    }
  }

  return traverse(rootNode, undefined);
}

function getElementByBlockId(childId: string, node: TNode): TNode | null {
  if (node.attrs?.id === childId) {
    return node;
  }

  if (node.content?.length) {
    for (const child of node.content) {
      const result = getElementByBlockId(childId, child);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

const getNodeIds = (nodes: TNode[]): string[] =>
  nodes.map((node: TNode) => node.attrs?.id).filter((id) => id);

const getAlignment = (align: string): number => {
  switch (align) {
    case 'center':
      return 2;
    case 'right':
      return 3;
    default:
      return 1;
  }
};

const getElementStyle = (marks: TMark[]): TextRunStyle => {
  const style: TextRunStyle = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    inline_code: false,
  };

  (marks || []).forEach((mark) => {
    switch (mark.type) {
      case 'bold':
        style.bold = true;
        break;
      case 'italic':
        style.italic = true;
        break;
      case 'underline':
        style.underline = true;
        break;
      case 'strike':
        style.strikethrough = true;
        break;
      case 'code':
        style.inline_code = true;
        break;
      case 'textStyle':
        style.text_color = mark.attrs.color;
        break;
      case 'highlight':
        style.background_color = mark.attrs.color;
        break;
      case 'link':
        style.link = { url: mark.attrs.href };
        break;
      default:
        console.warn(`Unknown mark: ${mark}`);
    }
  });

  return style;
};

const getElements = (
  content: TNode[],
  convertNode: (node: TNode) => TBlock | null
): TextElement[] => {
  return content
    .map((node) => {
      if (node.type === 'text') {
        return {
          text_run: {
            content: node.text,
            text_element_style: getElementStyle(node.marks),
          },
        };
      } else {
        return convertNode(node);
      }
    })
    .filter((element) => element) as TextElement[];
};

export function convertFromTiptapContent(rootNode: TNode) {
  const blockList: TBlock[] = [];

  const convertNode = (tiptapNode: TNode): TBlock | null => {
    const attrs = tiptapNode.attrs || {};
    const blockType = tiptapNode.type || undefined;
    const content = tiptapNode.content || [];

    switch (blockType) {
      case 'doc':
        return {
          block_type: 'page',
          block_id: attrs.id,
          parent_id: '',
          block_content: {},
          node_ids: getNodeIds(content),
        };

      case 'heading':
        return {
          block_type: 'heading' + attrs.level,
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_style: {
            style: {
              align: getAlignment(attrs.textAlign),
            },
          },
          block_content: {
            elements: getElements(content, convertNode),
          },
          node_ids: [],
        };

      case 'paragraph':
        return {
          block_type: 'text',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_style: {
            style: {
              align: getAlignment(attrs.textAlign),
            },
          },
          block_content: {
            elements: getElements(content, convertNode),
          },
          node_ids: [],
        };

      case 'bulletList':
        const node_ids = getNodeIds(
          content.reduce(
            (acc: TNode[], item: TNode) => acc.concat(item.content),
            []
          )
        );
        return {
          block_type: 'bullet',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {},
          node_ids,
        };

      case 'orderedList':
        const ids = getNodeIds(
          content.reduce(
            (acc: TNode[], item: TNode) => acc.concat(item.content),
            []
          )
        );
        return {
          block_type: 'ordered',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_style: {
            style: {
              align: getAlignment(attrs.textAlign),
              sequence: attrs.start,
            },
          },
          block_content: {
            elements: [],
          },
          node_ids: ids,
        };

      case 'codeBlock':
        return {
          block_type: 'code',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_style: {
            style: {
              language: attrs.language || 0,
            },
          },
          block_content: {
            elements: getElements(content, convertNode),
          },
          node_ids: [],
        };

      case 'horizontalRule':
        return {
          block_type: 'divider',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {},
          node_ids: [],
        };

      case 'blockquote':
        return {
          block_type: 'quote_container',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {},
          node_ids: getNodeIds(content),
        };

      case 'image':
        return {
          block_type: 'image',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {
            style: {
              src: attrs.src,
              align: getAlignment(attrs.textAlign),
            },
            elements: {
              text_run: {
                content: attrs.src,
                text_element_style: [],
              },
            },
          },
          node_ids: [],
        };

      case 'table': {
        const tableCellIds = getNodeIds(
          content.reduce(
            (acc: TNode[], item: TNode) => acc.concat(item.content),
            []
          )
        );

        let rowSize = 0;
        const columnWidth = [] as number[];
        const mergeInfo = [] as TProperty['merge_info'];

        content.forEach((tableRow: any, rowIndex: number) => {
          tableRow.content.forEach((tableCell: any, cellIndex: number) => {
            const attrs = tableCell.attrs;

            if (rowIndex === 0) {
              for (let i = 0; i < attrs.colspan; i++) {
                columnWidth.push(attrs.colwidth[i]);
              }
            }

            if (cellIndex === 0) {
              for (let i = 0; i < attrs.rowspan; i++) {
                rowSize += attrs.rowspan;
              }
            }

            mergeInfo.push({
              col_span: attrs.colspan,
              row_span: attrs.rowspan,
            });
          });
        });

        return {
          block_type: 'table',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {
            cells: tableCellIds,
            property: {
              row_size: rowSize,
              column_size: columnWidth.length,
              column_width: columnWidth,
              merge_info: mergeInfo,
            },
          },
          node_ids: tableCellIds,
        };
      }

      case 'tableCell':
        return {
          block_type: 'table_cell',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode) || '',
          block_content: {},
          node_ids: getNodeIds(content),
        };

      case 'callout':
        return {
          block_type: 'callout',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_style: {
            style: {
              align: getAlignment(attrs.textAlign),
            },
          },
          block_content: {
            emoji_id: attrs.emoji_id,
            text_color: attrs.textColor,
            border_color: attrs.borderColor,
          },
          node_ids: getNodeIds(content),
        };

      default:
        console.warn(`Node type ${blockType} is not supported.`);
        // return null;
        return {
          block_type: 'undefined',
          block_id: attrs.id,
          parent_id: getParentId(attrs.id, rootNode),
          block_content: {},
          node_ids: getNodeIds(content),
        };
    }
  };

  const loop = (node: TNode | null) => {
    if (!node) return;

    const convertedNode = convertNode(node);
    if (convertedNode) {
      blockList.push(convertedNode);
      (convertedNode.node_ids || []).forEach((id) => {
        loop(getElementByBlockId(id, rootNode));
      });
    }
  };
  loop(rootNode);

  return blockList;
}
