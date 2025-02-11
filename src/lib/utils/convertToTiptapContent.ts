import { v4 as uuidv4 } from 'uuid';
import {
  TProperty,
  TextRunStyle,
  ContentStyle,
  TBlock,
  TNode,
  TextElement,
} from './types';

const headingMatch = (blockType: string) => blockType.match(/^heading(\d+)$/);

const getAlignment = (align: number | undefined) => {
  switch (align) {
    case 2:
      return 'center';
    case 3:
      return 'right';
    default:
      return 'left';
  }
};

const getMarks = (style: TextRunStyle) => {
  const marks = [];
  if (style.bold) marks.push({ type: 'bold' });
  if (style.italic) marks.push({ type: 'italic' });
  if (style.underline) marks.push({ type: 'underline' });
  if (style.strikethrough) marks.push({ type: 'strike' });
  if (style.inline_code) marks.push({ type: 'code' });
  if (style.text_color)
    marks.push({ type: 'textStyle', attrs: { color: style.text_color } });
  if (style.background_color)
    marks.push({
      type: 'highlight',
      attrs: { color: style.background_color },
    });
  if (style.link) marks.push({ type: 'link', attrs: { href: style.link.url } });
  return marks;
};

const mergeInfoTo2DArray = (
  mergeInfo: TProperty['merge_info'],
  rowSize: number,
  columnSize: number,
  columnWidth: number[]
) => {
  const grid = Array.from({ length: rowSize }, () =>
    Array(columnSize).fill(-1)
  );
  let currentNumber = 0;

  for (let r = 0; r < rowSize; r++) {
    loop: for (let c = 0; c < columnSize; c++) {
      if (grid[r][c] === -1) {
        const merge = mergeInfo[currentNumber];

        if (!merge) {
          return grid;
        }

        for (let i = 0; i < merge.row_span; i++) {
          for (let j = 0; j < merge.col_span; j++) {
            if (
              r + i >= rowSize ||
              c + j >= columnSize ||
              grid[r + i][c + j] !== -1
            ) {
              continue loop;
            }
          }
        }

        for (let i = 0; i < merge.row_span; i++) {
          for (let j = 0; j < merge.col_span; j++) {
            if (i === 0 && j === 0) {
              grid[r][c] = {
                index: currentNumber,
                rowspan: merge.row_span,
                colspan: merge.col_span,
                colwidth: columnWidth.slice(c, c + merge.col_span),
              };
            } else {
              grid[r + i][c + j] = 1;
            }
          }
        }
        currentNumber++;
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    grid[i] = grid[i].filter((value) => value !== -1 && value !== 1);
  }

  return grid;
};

const getLanguage = (languageId: ContentStyle['language']) => {
  switch (languageId) {
    // TODO: more languages
    case 7:
      return 'html';
    default:
      return 'plaintext';
  }
};

const getContent = ({
  elements = [],
  childNodeIds = [],
  blocks = [],
  convertBlock,
  style,
}: {
  elements: TextElement[];
  childNodeIds: string[];
  blocks: TBlock[];
  convertBlock: (block: TBlock) => TNode | null;
  style?: ContentStyle;
}) => {
  const content: TNode[] = [];
  if (elements.length) {
    const elementContent = elements
      .filter((element) => element.text_run?.content)
      .map((element) => ({
        type: 'text',
        text: element.text_run.content,
        marks: getMarks(element.text_run.text_element_style),
      }));

    if (childNodeIds.length) {
      content.push({
        type: 'paragraph',
        attrs: {
          textAlign: getAlignment(style?.align),
          id: uuidv4(), // TODO: remove id after compeleting id plugin
        },
        content: elementContent,
      });
    } else {
      content.push(...elementContent);
    }
  }
  if (childNodeIds.length) {
    const nodes = childNodeIds
      .map((nodeId) => {
        const subBlock = blocks.find(
          (subBlock) => subBlock.block_id === nodeId
        );
        if (subBlock) {
          return convertBlock(subBlock);
        }
      })
      .filter((block) => block) as TNode[];

    content.push(...nodes);
  }

  return content;
};

const getListContent = ({
  elements,
  childNodeIds,
  blocks,
  convertBlock,
}: {
  elements: TextElement[];
  childNodeIds: string[];
  blocks: TBlock[];
  convertBlock: (block: TBlock) => TNode | null;
}) => {
  let content: TNode[] = [];

  if (childNodeIds.length) {
    childNodeIds.forEach((nodeId) => {
      const subBlock = blocks.find((subBlock) => subBlock.block_id === nodeId);
      if (subBlock) {
        content.push({
          type: 'listItem',
          attrs: { id: uuidv4() }, // TODO: remove id after compeleting id plugin
          content: convertBlock(subBlock) ? [convertBlock(subBlock)] : [],
        });
      }
    });
  } else {
    content = elements.map((element) => ({
      attrs: { id: uuidv4() }, // TODO: remove id after compeleting id plugin
      type: 'listItem',
      content: [
        {
          type: 'paragraph',
          attrs: {
            id: uuidv4(), // TODO: remove id after compeleting id plugin
          },
          content: getContent({
            elements: [element],
            childNodeIds,
            blocks,
            convertBlock,
          }),
        },
      ],
    }));
  }

  return content;
};

export function convertToTiptapContent(blocks: TBlock[]): TNode {
  const convertBlock = (block: TBlock): TNode | null => {
    const blockType = block.block_type;
    const childNodeIds = block.node_ids || [];
    const content = block.content || {};
    const style = block.block_style?.style || {};
    const elements = content.elements || [];

    switch (blockType) {
      case 'page':
        return {
          type: 'doc',
          attrs: { id: block.block_id },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'heading1':
      case 'heading2':
      case 'heading3':
      case 'heading4':
      case 'heading5':
      case 'heading6':
        const level = parseInt(headingMatch(blockType)![1]);
        return {
          type: 'heading',
          attrs: {
            level,
            textAlign: getAlignment(style.align),
            id: block.block_id,
          },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'text':
        return {
          type: 'paragraph',
          attrs: {
            textAlign: getAlignment(style.align),
            id: block.block_id,
          },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'bullet':
        return {
          type: 'bulletList',
          attrs: { id: block.block_id },
          content: getListContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
          }),
        };

      case 'ordered':
        return {
          type: 'orderedList',
          attrs: {
            start: parseInt(style.sequence || '1'),
            textAlign: getAlignment(style.align),
            id: block.block_id,
          },
          content: getListContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
          }),
        };

      case 'code':
        return {
          type: 'codeBlock',
          attrs: {
            language: getLanguage(style.language),
            id: block.block_id,
          },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'divider':
        return {
          type: 'horizontalRule',
          attrs: { id: block.block_id },
        };

      case 'quote_container':
        return {
          type: 'blockquote',
          attrs: { id: block.block_id },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'image':
        return {
          type: 'image',
          attrs: {
            src: `${block.block_content?.style.src}`,
            textAlign: getAlignment(block.block_content?.style.align),
            id: block.block_id,
          },
        };

      case 'table': {
        const { cells, property } = content;
        if (!cells?.length || !property?.row_size) {
          return {
            type: 'table',
            attrs: { id: block.block_id },
            content: [],
          };
        }

        const { row_size, merge_info, column_size, column_width } = property;
        const tableContent: TNode[] = [];

        // convert to a two-dimensional array indexed by rows and columns;
        const tableData = mergeInfoTo2DArray(
          merge_info,
          row_size,
          column_size,
          column_width
        );

        tableData.map((item) => {
          // create row
          const row: TNode = {
            type: 'tableRow',
            attrs: { id: uuidv4() }, // TODO: remove id after compeleting id plugin
            content: [],
          };

          item.forEach((cell) => {
            // create cell
            const { index, rowspan, colspan, colwidth } = cell;
            blocks.forEach((subBlock) => {
              if (subBlock.block_id === cells[index]) {
                const cellContent = convertBlock(subBlock);

                if (cellContent) {
                  cellContent.attrs = {
                    id: subBlock.block_id,
                    colspan,
                    rowspan,
                    colwidth,
                  };

                  row.content.push(cellContent);
                }
              }
            });
          });
          tableContent.push(row);
        });
        return {
          type: 'table',
          attrs: { id: block.block_id },
          content: tableContent,
        };
      }

      case 'table_cell':
        return {
          type: 'tableCell',
          attrs: { id: uuidv4() }, // TODO: remove id after compeleting id plugin
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      case 'callout':
        return {
          type: 'callout',
          attrs: {
            emoji_id: content.emoji_id,
            textColor: content.text_color,
            borderColor: content.border_color,
            textAlign: getAlignment(style.align),
            id: block.block_id,
          },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };

      default:
        console.warn(`Block type ${block.block_type} is not supported.`);
        // return null;
        return {
          type: 'block',
          attrs: {
            textAlign: getAlignment(style.align),
            id: block.block_id,
          },
          content: getContent({
            elements,
            childNodeIds,
            blocks,
            convertBlock,
            style,
          }),
        };
    }
  };

  return convertBlock(blocks.find((block) => block.block_type === 'page')!)!;
}
