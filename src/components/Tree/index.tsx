import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import { DeepNode, TreeProps } from '@/types/tree';
import { filterTree, flattenTree } from './TreeUtils';
import TreeNodeComponent from './TreeNode';

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
