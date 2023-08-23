import React, { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import wondTypes from '../assets/wound_types.json?raw';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

const data: TreeNode[] = JSON.parse(wondTypes);

const FilterableTreeView = ({
  selectedItem,
  onItemSelected,
}: {
  onItemSelected: (item: string | undefined) => void;
  selectedItem: string | undefined;
}): JSX.Element => {
  const [filterText, setFilterText] = useState<string>('');

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleNodeExpandToggle = (item: string) => {
    if (expandedItems.indexOf(item) === -1) {
      setExpandedItems((prev) => [...prev, item]);
    } else {
      setExpandedItems((prev) => {
        const newItems = [...prev];
        newItems.splice(newItems.indexOf(item), 1);
        return newItems;
      });
    }
  };

  const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
    return nodes
      .map((node) => {
        const filteredChildren = filterNodes(node.children || [], query);

        const regexPattern = /[^a-zA-Z0-9]/g;
        const filteredString = node.name
          .replace(regexPattern, '')
          .toLowerCase();
        const filteredQuery = query.replace(regexPattern, '').toLowerCase();

        if (
          filteredChildren.length > 0 ||
          filteredString.includes(filteredQuery)
        ) {
          return {
            ...node,
            children: filteredChildren,
          };
        }
        return null;
      })
      .filter(Boolean) as TreeNode[];
  };

  const filteredData = filterNodes(data, filterText);

  const expanded =
    filterText != '' ? filteredData.map((node) => node.id) : expandedItems;

  const childItems = filteredData.flatMap((d) =>
    d.children?.length != 0 ? d.children : d
  );

  console.log('ci', { childItems, filteredData });

  if (childItems.length === 1) {
    onItemSelected(childItems[0]?.name);
  }

  const renderTree = (nodes: TreeNode[]): React.ReactNode => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        style={{
          backgroundColor:
            selectedItem === node.name ? '#77a5f7' : 'transparent',
        }}
        onClick={() => {
          if (node.children?.length === 0) {
            onItemSelected(node.name);
          } else {
            handleNodeExpandToggle(node.id);
          }
        }}
        label={<div style={{ padding: '6px' }}>{node.name}</div>}
      >
        {node.children && node.children.length > 0 && renderTree(node.children)}
      </TreeItem>
    ));
  };

  return (
    <div>
      <TextField
        label="Wundtyp suchen"
        variant="outlined"
        fullWidth
        size="small"
        value={filterText}
        sx={{ marginBottom: '16px' }}
        onChange={handleFilterChange}
      />
      <TreeView
        sx={{ height: '300px', overflowY: 'scroll', overflowX: 'hidden' }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
      >
        {renderTree(filteredData)}
      </TreeView>
    </div>
  );
};

export default FilterableTreeView;
