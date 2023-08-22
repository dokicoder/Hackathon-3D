import React, { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import wondTypes from "../assets/wound_types.json?raw";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

const data: TreeNode[] = JSON.parse(wondTypes);

const FilterableTreeView: React.FC = () => {
  const [filterText, setFilterText] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
    return nodes
      .map((node) => {
        const filteredChildren = filterNodes(node.children || [], query);
        if (
          filteredChildren.length > 0 ||
          node.name.toLowerCase().includes(query.toLowerCase())
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

  const renderTree = (nodes: TreeNode[]): React.ReactNode => {
    return nodes.map((node) => (
      <TreeItem key={node.id} nodeId={node.id} label={node.name}>
        {node.children && node.children.length > 0 && renderTree(node.children)}
      </TreeItem>
    ));
  };

  return (
    <div>
      <TextField
        label="Filter"
        variant="outlined"
        fullWidth
        value={filterText}
        onChange={handleFilterChange}
      />
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(filteredData)}
      </TreeView>
    </div>
  );
};

export default FilterableTreeView;
