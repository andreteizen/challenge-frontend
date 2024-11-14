import { TreeProps, DeepNode } from '@/types/tree';
import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import TreeNodeComponent from './TreeNode';
import { filterTree, flattenTree } from './TreeUtils';

/**
 * A memoized React component that renders a tree structure using a virtualized list.
 * It supports filtering, expanding/collapsing nodes, and selecting a node.
 *
 * @param {TreeProps} props - The properties for the Tree component.
 * @param {DeepNode[]} props.data - The hierarchical data to be displayed in the tree.
 * @param {any} props.filters - The filters to be applied to the tree data.
 * @param {(nodeId: string) => void} props.onSelectNode - Callback function to handle node selection.
 * @param {string} props.selectedNode - The ID of the currently selected node.
 * @returns {JSX.Element} The rendered tree component.
 */
export default memo(function Tree({
  data,
  filters,
  onSelectNode,
  selectedNode,
}: TreeProps) {
  const height = window.innerHeight;
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [flattenedData, setFlattenedData] = useState<DeepNode[]>([]);
  const listRef = useRef<FixedSizeList>(null);

  useEffect(() => {
    const filteredData = filterTree(data, filters);
    const flattened = flattenTree(filteredData, expandedNodes);
    setFlattenedData(flattened);
  }, [data, filters, expandedNodes]);

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const renderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      return (
        <TreeNodeComponent
          index={index}
          flattenedData={flattenedData}
          style={style}
          toggleNode={toggleNode}
          expandedNodes={expandedNodes}
          onSelectNode={onSelectNode}
          selectedNode={selectedNode}
        />
      );
    },
    [flattenedData, toggleNode, expandedNodes]
  );

  return (
    <div role="tree" aria-label="Árvore de ativos">
      <FixedSizeList
        ref={listRef}
        layout="vertical"
        height={height - 230}
        itemCount={flattenedData.length}
        itemSize={28}
        width="100%"
        className="overflow-hidden"
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});
