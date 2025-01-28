import React, { useEffect, useState } from "react";
import TreeComponentItem from "./TreeComponentItem";
import Xarrow from "react-xarrows";
import { ReactTemplateDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";

interface TreeViewProps {
  components: ReactTemplateDisplayDTO[];
}

interface TreeNodeProps {
  component: ReactTemplateDisplayDTO;
  children: TreeNodeProps[];
}

// Helper function to build a tree hierarchy
const buildComponentTree = (
  components: ReactTemplateDisplayDTO[]
): TreeNodeProps[] => {
  const componentMap = new Map<number, TreeNodeProps>();

  // Create a map of component IDs to their TreeNode
  components.forEach((comp) => {
    componentMap.set(comp.Id, { component: comp, children: [] });
  });

  // Create the tree by linking components to their related templates (children)
  const tree: TreeNodeProps[] = [];
  components.forEach((comp) => {
    const currentNode = componentMap.get(comp.Id);

    if (comp.RelatedTemplates.length > 0) {
      comp.RelatedTemplates.forEach((related) => {
        const childNode = componentMap.get(related.Id);
        if (childNode) {
          currentNode?.children.push(childNode);
        }
      });
    }

    // If the component doesn't have any parents (i.e., it's at the root level), add it to the tree
    if (
      !components.some((c) => c.RelatedTemplates.some((r) => r.Id === comp.Id))
    ) {
      tree.push(currentNode!);
    }
  });

  return tree;
};

const TreeView: React.FC<TreeViewProps> = ({ components }) => {
  const [componentTree, setComponentTree] = useState<TreeNodeProps[]>([]);
  const [notUsedComponents, setNotUsedComponents] = useState<
    ReactTemplateDisplayDTO[]
  >([]);

  useEffect(() => {
    const tree = buildComponentTree(components);
    setComponentTree(tree);

    // Identify unused components that are not part of the tree
    const usedComponentIds = new Set<number>();
    const flattenTree = (nodes: TreeNodeProps[]) => {
      nodes.forEach((node) => {
        usedComponentIds.add(node.component.Id);
        flattenTree(node.children);
      });
    };
    flattenTree(tree);

    const unusedComponents = components.filter(
      (comp) => !usedComponentIds.has(comp.Id)
    );
    setNotUsedComponents(unusedComponents);
  }, [components]);

  // Recursive function to render the tree
  const renderTree = (nodes: TreeNodeProps[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.component.Id} className="flex flex-col ml-4">
        <TreeComponentItem
          component={node.component}
          isMain={level === 0}
          isCurrent={false}
        />
        {node.children.length > 0 && (
          <div className="ml-4">{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-4/5">
        {componentTree.length > 0 && renderTree(componentTree)}
      </div>
      <div className="flex flex-col border-l-2 w-1/5 items-center">
        {notUsedComponents.map((c) => (
          <TreeComponentItem
            key={c.Id}
            component={c}
            isMain={false}
            isCurrent={false}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
