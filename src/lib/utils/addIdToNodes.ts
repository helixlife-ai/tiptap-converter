import { TNode } from './types';
import { v4 as uuidv4 } from 'uuid';

export const addIdToNode = (node: TNode): TNode => {
  if (node.type === 'text') {
    return node;
  }

  if (!node.attrs?.id) {
    return {
      ...node,
      attrs: {
        ...node.attrs,
        id: uuidv4(),
      },
      content: (node.content || []).map((childNode: TNode) =>
        addIdToNode(childNode)
      ),
    };
  }

  return {
    ...node,
    content: (node.content || []).map((childNode: TNode) =>
      addIdToNode(childNode)
    ),
  };
};
