export interface TextRun {
  content: string;
  text_element_style: TextRunStyle;
}

export interface Content {
  style?: ContentStyle;
  elements?: TextElement[];
  emoji_id?: string;
  text_color?: string;
  border_color?: string;
  token?: string;
  align?: number;
  width?: number;
  height?: number;
  cells?: string[];
  property?: TProperty;
  colspan?: number;
  rowspan?: number;
  colwidth?: number[];
}

export interface TextRunStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  inline_code: boolean;
  strikethrough: boolean;
  text_color?: string;
  background_color?: string;
  link?: { url: string };
}

export interface TMark {
  type: string;
  attrs: Record<string, any>;
}

export interface TextElement {
  text_run: TextRun;
}

export interface ContentStyle {
  align?: number;
  folded?: boolean;
  sequence?: string;
  language?: number;
}

export interface TProperty {
  row_size: number;
  merge_info: { row_span: number; col_span: number }[];
  column_width: number[];
  column_size: number;
}

export interface TBlock {
  block_id: string;
  block_type: string;
  parent_id: string;
  block_content?: any;
  content: Content;
  sort?: number;
  created_at?: string;
  updated_at?: string;
  node_ids: string[];
  block_histories?: any[];
}

export interface TNode {
  type: string;
  [key: string]: any;
}
