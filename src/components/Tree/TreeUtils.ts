import { TreeNode, DeepNode, TreeProps } from '@/types/tree';

export const nodeFilters = (
  node: TreeNode,
  filters: TreeProps['filters']
): boolean => {
  const nameMatch = node.name
    .toLowerCase()
    .includes(filters.search.toLowerCase());
  const energyMatch =
    filters.status !== 'energy' ||
    ('sensorType' in node && node.sensorType === 'energy');
  const criticalMatch =
    filters.status !== 'alert' || ('status' in node && node.status === 'alert');
  return nameMatch && energyMatch && criticalMatch;
};

export const hasMatchingDescendant = (
  node: TreeNode,
  filters: TreeProps['filters']
): boolean => {
  if (nodeFilters(node, filters)) return true;
  if ('children' in node) {
    return node.children.some((child) => hasMatchingDescendant(child, filters));
  }
  return false;
};

export const filterTree = (
  nodes: TreeNode[],
  filters: TreeProps['filters']
): TreeNode[] => {
  return nodes.reduce<TreeNode[]>((acc, node) => {
    if (hasMatchingDescendant(node, filters)) {
      const filteredNode = {
        ...node,
        children: 'children' in node ? filterTree(node.children, filters) : [],
      };
      acc.push(filteredNode);
    }
    return acc;
  }, []);
};

export const flattenTree = (
  nodes: TreeNode[],
  expandedNodes: Set<string>,
  depth = 0,
  parentLastChildren: boolean[] = []
): DeepNode[] => {
  return nodes.reduce<DeepNode[]>((acc, node, index) => {
    const isLast = index === nodes.length - 1;
    const isFirst = index === 0;

    const flatNode: DeepNode = {
      ...node,
      depth,
      isLastChild: isLast,
      isFirstChild: isFirst,
      parentLastChildren: [...parentLastChildren, isLast],
    };

    acc.push(flatNode);

    if ('children' in node && node.children && expandedNodes.has(node.id)) {
      acc.push(
        ...flattenTree(node.children, expandedNodes, depth + 1, [
          ...parentLastChildren,
          isLast,
        ])
      );
    }

    return acc;
  }, []);
};
