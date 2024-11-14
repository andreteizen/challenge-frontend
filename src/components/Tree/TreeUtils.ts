import { TreeNode, DeepNode, TreeProps } from '@/types/tree';

/**
 * Filters a tree node based on the provided filters.
 * @param node - The tree node to be filtered.
 * @param filters - The filters to apply, including search and status.
 * @returns A boolean indicating if the node matches the filters.
 */
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

/**
 * Checks if a tree node or any of its descendants match the provided filters.
 * @param node - The tree node to check.
 * @param filters - The filters to apply.
 * @returns A boolean indicating if the node or any descendant matches the filters.
 */
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

/**
 * Filters a tree structure based on the provided filters.
 * @param nodes - The array of tree nodes to filter.
 * @param filters - The filters to apply.
 * @returns A new array of tree nodes that match the filters.
 */
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

/**
 * Flattens a tree structure into a list of nodes with additional metadata.
 * @param nodes - The array of tree nodes to flatten.
 * @param expandedNodes - A set of node IDs that are expanded.
 * @param depth - The current depth in the tree (default is 0).
 * @param parentLastChildren - An array indicating if each parent node is the last child.
 * @returns A new array of deep nodes with additional metadata.
 */
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
