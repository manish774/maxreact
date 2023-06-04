import React, { useState } from "react";
import "./Tree.css";
interface TreeNodeProps {
  name: string;
  child?: any[];
  level: number;
}

const TreeNode = ({ name, child, level }: TreeNodeProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const levelClass = `tree-level-${level}`;
  const childNodes =
    child && !collapsed ? (
      <div className="tree-child">
        {child.map((m: any, index: number) => (
          <TreeNode
            key={`${m.name}_${index}`}
            name={m.name}
            child={m.child}
            level={level + 1}
          />
        ))}
      </div>
    ) : null;

  return (
    <div className={`tree-node ${levelClass}`}>
      <div className="toggle" onClick={handleToggle}>
        {collapsed ? "+" : "-"}
      </div>
      <div className="node-name">{name}</div>
      {childNodes}
    </div>
  );
};

interface TreeProps {
  metadata: any;
  style?: React.CSSProperties;
}

const Tree = ({ metadata }: TreeProps) => {
  return (
    <>
      {metadata.map((m: any, index: number) => (
        <TreeNode
          key={`${m.name}_${index}`}
          name={m.name}
          child={m.child}
          level={1}
        />
      ))}
    </>
  );
};

export default Tree;
