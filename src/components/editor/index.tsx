'use client';

import './styles.scss';
import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';

import Document from '@tiptap/extension-document';
import { Heading } from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';

import Code from '@tiptap/extension-code';
import { CodeBlock } from '@tiptap/extension-code-block';

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Typography from '@tiptap/extension-typography';

import Link from '@tiptap/extension-link';

import Image from '@tiptap/extension-image';

import ListItem from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import { Blockquote } from '@tiptap/extension-blockquote';

import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { HardBreak } from '@tiptap/extension-hard-break';

import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';

import { Callout } from '@/lib/tiptap/extension-callout';
import { convertFromTiptapContent, convertToTiptapContent } from '@/lib/utils';
import type { TBlock } from '@/lib/utils';

const mockData = {
  success: true,
  code: 20000,
  message: '请求成功',
  data: {
    data: [
      // page
      {
        block_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        block_type: 'page',
        parent_id: '',
        content: {
          style: {
            align: 1,
          },
          elements: [
            {
              text_run: {
                content: '测试文档',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [
          'ZTRAd7Q65oOP6gxie15cn4FLnFk',
          'CLtNdLTMBodjQGxHIjuc5uc9n0c',
          'NdbbdGBKyo9R2Lxx6PncYU6ynKg',
          'NMYtdf0DZoB3FTxoH3ZclQPjnAf',
          'QEaodHDy6oUy3exHtk4cJGponad',
          'Rzaqdw2f9oHzJ1xvggGckiWTnke',
          'U1kYdlIySot9IixYl2MczVRSnVf',
          'BfY4dvKuaoJg9FxjltNcqOS8nfh',
          'XFzDdUp1coghEqxdQcxcBEH1nhe',
          'RlabdOiYnoQbMFxJWQoclQtyngg',
          'DoeudhARTo7ggCxozpucw2lYn2c',
          'Iqk2del4boGFbSxz4Gnc9adKnBc',
          'M7YNdlGeMoEcApxr8JWcDkRFncc',
          'TmR0drlqzoGcAexQLT6c2ipinzd',
          'B21gdanJDoVcEfxRclGciTe0nUe',
          'HpEidUGGHoi3L5xAXhWcMsAbnBb',
          'CxL6dMnwdoHsrJxbPxNcFs6cnAh',
          'QLojdYYjVoz6vLxfFOEc2qe6nYf',
          'UNHNdkbNpokCmkx9dEEcXrzenBg',
          'GHyxd7zeaomCbIxdvFkc5DvFnXg',
          'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
          'CPmoduKGGo48sGxW0zjcpLOHnkg',
          'Db2mdOCc0ozEbUxCw5rcoXH1nVb',
          'KygmdSZSCs5h9SbiqcRcbXUOnvd',
          'LvQNdmfVWoWiCBxxvEjcnx1pnAf',
          'L3O2d6Ljioztftxk0d6ckE6rntg',
        ],
        block_histories: [],
      },

      // heading
      {
        block_id: 'ZTRAd7Q65oOP6gxie15cn4FLnFk',
        block_type: 'heading1',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '一级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'CLtNdLTMBodjQGxHIjuc5uc9n0c',
        block_type: 'heading2',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '二级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'NdbbdGBKyo9R2Lxx6PncYU6ynKg',
        block_type: 'heading3',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '三级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'NMYtdf0DZoB3FTxoH3ZclQPjnAf',
        block_type: 'heading4',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '四级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'QEaodHDy6oUy3exHtk4cJGponad',
        block_type: 'heading5',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '五级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'Rzaqdw2f9oHzJ1xvggGckiWTnke',
        block_type: 'heading6',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '六级标题块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // text
      {
        block_id: 'U1kYdlIySot9IixYl2MczVRSnVf',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 2,
            folded: false,
          },

          elements: [
            {
              text_run: {
                content: '告别2023年，拥抱2024年，让我们带着',
                text_element_style: {
                  bold: true,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '坚实',
                text_element_style: {
                  bold: false,
                  italic: true,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '、',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: true,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '力量',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: true,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '、',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '神采',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: true,
                },
              },
            },
            {
              text_run: {
                content: '、',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '底气',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                  background_color: '#FF0000',
                  text_color: '#facc15',
                },
              },
            },
            {
              text_run: {
                content:
                  '这四个词再出发，大家一起迈出新步伐，以自身的确定性应对形势变化的不确定性。',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // bullet
      {
        block_id: 'BfY4dvKuaoJg9FxjltNcqOS8nfh',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是无序列表块：',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'XFzDdUp1coghEqxdQcxcBEH1nhe',
        block_type: 'bullet',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '无序列表1',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // ordered list
      {
        block_id: 'RlabdOiYnoQbMFxJWQoclQtyngg',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是有序列表块：',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'DoeudhARTo7ggCxozpucw2lYn2c',
        block_type: 'ordered',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
            sequence: '1',
          },
          elements: [
            {
              text_run: {
                content: '有序列表1',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // code
      {
        block_id: 'Iqk2del4boGFbSxz4Gnc9adKnBc',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是代码块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'M7YNdlGeMoEcApxr8JWcDkRFncc',
        block_type: 'code',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            wrap: false,
            language: 7,
          },
          elements: [
            {
              text_run: {
                content: '<p>hello world</p>',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // divider
      {
        block_id: 'TmR0drlqzoGcAexQLT6c2ipinzd',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是分割线块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'B21gdanJDoVcEfxRclGciTe0nUe',
        block_type: 'divider',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // quote_container
      {
        block_id: 'HpEidUGGHoi3L5xAXhWcMsAbnBb',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是引用块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'CxL6dMnwdoHsrJxbPxNcFs6cnAh',
        block_type: 'quote_container',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['DGEWd4bd0oF0eXxz5yFcn81Ln5g'],
        block_histories: [],
      },
      {
        block_id: 'DGEWd4bd0oF0eXxz5yFcn81Ln5g',
        block_type: 'text',
        parent_id: 'CxL6dMnwdoHsrJxbPxNcFs6cnAh',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '引用模块，不知道引用了什么',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // image
      {
        block_id: 'QLojdYYjVoz6vLxfFOEc2qe6nYf',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是图片模块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'UNHNdkbNpokCmkx9dEEcXrzenBg',
        block_type: 'image',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          align: 2,
          // "token": "BkiybBC0Vod5rWxqgmIc38DFnoq",
          token:
            'https://cdn.pixabay.com/photo/2024/12/20/11/53/architect-9280053_1280.jpg',
          width: 2139,
          height: 1284,
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // table
      {
        block_id: 'GHyxd7zeaomCbIxdvFkc5DvFnXg',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是表格块',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        block_type: 'table',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          cells: [
            'LPEldutVuouIG3xdTXVcU1Wln6c',
            'Zoa1d9hCHolv9rxlCnCcu65Bnxc',
            'G1drdKrykobrWuxHxQVc0RDSngc',
            'YX2KduxARosAO2xg4GjcP6lwnyl',
            'QDS7djTGQokevRx6MKPchC9fnSc',
            'JXR8delvloTzjexw5Ejcfnnxn9c',
          ],
          property: {
            row_size: 3,
            merge_info: [
              {
                col_span: 1,
                row_span: 1,
              },
              {
                col_span: 2,
                row_span: 2,
              },
              {
                col_span: 1,
                row_span: 1,
              },
              // {
              //     "col_span": 1,
              //     "row_span": 1
              // },
              {
                col_span: 2,
                row_span: 1,
              },
              {
                col_span: 1,
                row_span: 1,
              },
            ],
            column_size: 3,
            column_width: [252, 202, 194],
          },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [
          'LPEldutVuouIG3xdTXVcU1Wln6c',
          'Zoa1d9hCHolv9rxlCnCcu65Bnxc',
          'G1drdKrykobrWuxHxQVc0RDSngc',
          'YX2KduxARosAO2xg4GjcP6lwnyl',
          'QDS7djTGQokevRx6MKPchC9fnSc',
          'JXR8delvloTzjexw5Ejcfnnxn9c',
        ],
        block_histories: [],
      },
      {
        block_id: 'LPEldutVuouIG3xdTXVcU1Wln6c',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['F4nydc9w3oBMXyxfCKIcQgXHnih'],
        block_histories: [],
      },
      {
        block_id: 'F4nydc9w3oBMXyxfCKIcQgXHnih',
        block_type: 'text',
        parent_id: 'LPEldutVuouIG3xdTXVcU1Wln6c',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '单元格1居左',
                text_element_style: {
                  bold: false,
                  italic: true,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 500,
        created_at: '2025-01-03 13:16:59',
        updated_at: '2025-01-03 13:16:59',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'Zoa1d9hCHolv9rxlCnCcu65Bnxc',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['Qrs2dVHJLoEjSvxe5xUcZAPDn1d'],
        block_histories: [],
      },
      {
        block_id: 'Qrs2dVHJLoEjSvxe5xUcZAPDn1d',
        block_type: 'text',
        parent_id: 'Zoa1d9hCHolv9rxlCnCcu65Bnxc',
        content: {
          elements: [
            {
              text_run: {
                content: '单元格2居中',
                text_element_style: {
                  bold: false,
                  inline_code: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
              },
            },
          ],
          style: { align: 2, folded: false },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'G1drdKrykobrWuxHxQVc0RDSngc',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['OHFYd3ti3oCFYOxz0E6cRiuRnoc'],
        block_histories: [],
      },
      {
        block_id: 'OHFYd3ti3oCFYOxz0E6cRiuRnoc',
        block_type: 'text',
        parent_id: 'G1drdKrykobrWuxHxQVc0RDSngc',
        content: {
          elements: [
            {
              text_run: {
                content: '单元格3居右',
                text_element_style: {
                  bold: false,
                  inline_code: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
              },
            },
          ],
          style: { align: 3, folded: false },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'YX2KduxARosAO2xg4GjcP6lwnyl',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['EInUdXy4soBf4zxAjz9cIY6znhd'],
        block_histories: [],
      },
      {
        block_id: 'EInUdXy4soBf4zxAjz9cIY6znhd',
        block_type: 'text',
        parent_id: 'YX2KduxARosAO2xg4GjcP6lwnyl',
        content: {
          elements: [
            {
              text_run: {
                content: '单元格4居左并顶部对齐',
                text_element_style: {
                  bold: false,
                  inline_code: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
              },
            },
          ],
          style: { align: 1, folded: false },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'QDS7djTGQokevRx6MKPchC9fnSc',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['UqM8dgADXolhq5xQmfjcuQB4nee'],
        block_histories: [],
      },
      {
        block_id: 'UqM8dgADXolhq5xQmfjcuQB4nee',
        block_type: 'text',
        parent_id: 'QDS7djTGQokevRx6MKPchC9fnSc',
        content: {
          elements: [
            {
              text_run: {
                content: '单元格5居中并底部对齐',
                text_element_style: {
                  bold: false,
                  inline_code: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
              },
            },
          ],
          style: {
            align: 2,
            folded: false,
          },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'JXR8delvloTzjexw5Ejcfnnxn9c',
        block_type: 'table_cell',
        parent_id: 'Jc0yd0NA6oGUcqxc1lCcECCBnbf',
        content: {},
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['VotKdw5zaoZtHvxzgZ8cLmuUnPf'],
        block_histories: [],
      },
      {
        block_id: 'VotKdw5zaoZtHvxzgZ8cLmuUnPf',
        block_type: 'text',
        parent_id: 'JXR8delvloTzjexw5Ejcfnnxn9c',
        content: {
          elements: [
            {
              text_run: {
                content: '单元格右对齐并垂直居中',
                text_element_style: {
                  bold: false,
                  inline_code: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                },
              },
            },
          ],
          style: { align: 3, folded: false },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // link
      {
        block_id: 'CPmoduKGGo48sGxW0zjcpLOHnkg',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '下面是链接预览',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'Db2mdOCc0ozEbUxCw5rcoXH1nVb',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '解螺旋官网',
                text_element_style: {
                  bold: false,
                  link: {
                    url: 'https%3A%2F%2Fwww.helixlife.cn',
                  },
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },

      // {
      //     "block_id": "KygmdSZSCs5h9SbiqcRcbXUOnvd",
      //     "block_type": "undefined",
      //     "parent_id": "URg9dmL0eovUh8x53WYcWYK1nns",
      //     "content": {},
      //     "sort": 0,
      //     "created_at": "",
      //     "updated_at": "",
      //     "node_ids": [
      //         "KLUBdpM9UoZ1PexD2WHcxeu7nGe"
      //     ],
      //     "block_histories": []
      // },

      // callout
      {
        block_id: 'KygmdSZSCs5h9SbiqcRcbXUOnvd',
        block_type: 'callout',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          emoji_id: 'snowboarder',
          text_color: '#ff0000',
          border_color: '#0000ff',
          style: {
            align: 2,
          },
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: ['XjpgdnfeGol23rxTV4Dc9jPenqb'],
        block_histories: [],
      },
      {
        block_id: 'XjpgdnfeGol23rxTV4Dc9jPenqb',
        block_type: 'text',
        parent_id: 'KLUBdpM9UoZ1PexD2WHcxeu7nGe',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '一键配置仪表盘，人人都可以是业务高手！',
                text_element_style: {
                  bold: true,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '\n',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
            {
              text_run: {
                content: '数据实时刷新，定时推送数据报告到群，让业务从这里起飞',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  text_color: 7,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 500,
        created_at: '2025-01-03 13:16:59',
        updated_at: '2025-01-03 13:16:59',
        node_ids: [],
        block_histories: [],
      },

      {
        block_id: 'LvQNdmfVWoWiCBxxvEjcnx1pnAf',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
      {
        block_id: 'L3O2d6Ljioztftxk0d6ckE6rntg',
        block_type: 'text',
        parent_id: 'URg9dmL0eovUh8x53WYcWYK1nns',
        content: {
          style: {
            align: 1,
            folded: false,
          },
          elements: [
            {
              text_run: {
                content: '',
                text_element_style: {
                  bold: false,
                  italic: false,
                  underline: false,
                  inline_code: false,
                  strikethrough: false,
                },
              },
            },
          ],
        },
        sort: 0,
        created_at: '',
        updated_at: '',
        node_ids: [],
        block_histories: [],
      },
    ],
    has_more: true,
  },
};

import MenuBar from './MenuBar';

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
  ];

  const editor = useEditor({
    extensions,
    content: convertToTiptapContent(
      convertFromTiptapContent(
        convertToTiptapContent(mockData.data.data as TBlock[])
      )
    ),
    // content: convertToTiptapContent(mockData.data.data as TBlock[]),
  });

  return (
    <div className="p-5">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="pt-10" />
    </div>
  );
};

export default Editor;
