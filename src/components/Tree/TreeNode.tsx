import React from 'react';
import clsx from 'clsx';
import { DeepNode, TreeNode } from '@/types/tree';

import ComponentIcon from '@public/icons/componentIcon.png';
import ChevronDown from '@public/icons/chevronDown.png';
import ChevronRight from '@public/icons/chevronRight.png';
import BoltIcon from '@public/icons/boltIcon.png';

import { NodeIcon } from './TreeIcons';
import Image from 'next/image';

type TreeNodeProps = {
  index: number;
  flattenedData: DeepNode[];
  style: React.CSSProperties;
  toggleNode(id: string): void;
  expandedNodes: Set<string>;
  onSelectNode: (node: TreeNode | null) => void;
  selectedNode: TreeNode | null;
};

const TreeNodeComponent = ({
  index,
  flattenedData,
  style,
  toggleNode,
  expandedNodes,
  onSelectNode,
  selectedNode,
}: TreeNodeProps) => {
  const node = flattenedData[index];
  const hasChildren = 'children' in node && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const baseIndent = 20;
  const pl = node.depth * baseIndent;
  const assetSensorType = 'sensorType' in node && node.sensorType;

  return (
    <div
      style={{
        ...style,
        paddingLeft: pl + 'px',
        height: '28px',
      }}
      key={node.id}
      id={`tree-node-${node.id}`}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-level={node.depth + 1}
      aria-setsize={flattenedData.length}
      aria-posinset={index + 1}
    >
      {node.depth > 0 &&
        Array.from({ length: node.depth }).map((_, i) => {
          if (!(i === node.depth - 1)) {
            return null;
          }

          if (node.type !== 'location') {
            return (
              <div
                key={i}
                className={'absolute w-[1px] bg-gray-200'}
                style={{
                  left: `${i * baseIndent + 26}px`,
                  top: '-4px',
                  bottom: 0,
                  height: node.isLastChild
                    ? hasChildren
                      ? '30%'
                      : '20px'
                    : '100%',
                }}
              />
            );
          }
        })}

      {node.depth > 0 && assetSensorType && (
        <div
          className="absolute h-[1px] bg-gray-200"
          style={{
            left: `${(node.depth - 1) * baseIndent + 26}px`,
            width: '10px',
            top: '14px',
          }}
        />
      )}

      <div className="flex items-center gap-0">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleNode(node.id)}
              className="z-20 w-4 h-4 flex items-center justify-center hover:bg-gray-100 rounded"
              aria-label={isExpanded ? 'Recolher' : 'Expandir'}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleNode(node.id);
                }
              }}
            >
              {isExpanded ? (
                <Image
                  alt="Component"
                  src={ChevronDown}
                  width={10}
                  height={10}
                  aria-hidden="true"
                />
              ) : (
                <Image
                  alt="Component"
                  src={ChevronRight}
                  width={10}
                  height={10}
                  aria-hidden="true"
                />
              )}
            </button>
          </>
        ) : (
          <span className="ml-4" aria-hidden="true" />
        )}
        <span
          className={clsx('flex items-center justify-start sm:w-full pr-2', {
            'group cursor-pointer rounded-sm': assetSensorType,
            'bg-blue-500 text-white cursor-pointer rounded-sm stroke-white relative right-1':
              selectedNode?.id === node.id && assetSensorType,
          })}
          onClick={() => {
            if (assetSensorType) {
              onSelectNode && onSelectNode(node);
              // onSelectNode((prev) => {
              //   if (prev?.id === node.id) {
              //     onSelectNode && onSelectNode(null);
              //     return null;
              //   }
              //   return node;
              // });
            }
          }}
        >
          {assetSensorType ? (
            <Image alt="Component" src={ComponentIcon} width={20} height={20} />
          ) : (
            NodeIcon(node)
          )}
          <span className="ml-1 truncate">{node.name}</span>
          {'status' in node && node.status === 'alert' && (
            <div
              className="ml-2 bg-red-500 h-2 w-2 rounded-full"
              aria-label="Status crítico"
            />
          )}
          {assetSensorType === 'energy' && (
            <Image
              alt="Sensor de energia"
              src={BoltIcon}
              className="ml-2"
              width={10}
              height={10}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default TreeNodeComponent;
