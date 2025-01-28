import {
  ProjectDirectoryDisplayDTO,
  ReactTemplateDisplayDTO,
} from "@/app/assets/api/types/dtos/InlineReactDtos";
import { TreeNodeProps } from "../treeView/treenode/TreeNode.types";

// Helper function to build hierarchical structure
const buildHierarchy = (
  directories: ProjectDirectoryDisplayDTO[],
  components: ReactTemplateDisplayDTO[]
) => {
  const directoryMap = new Map<number, TreeNodeProps["item"]>();

  // Initialize map with directories
  directories.forEach((dir) => {
    directoryMap.set(dir.Id, {
      ItemProps: { ...dir },
      items: [],
    });
  });

  // Add components to their respective directories
  components.forEach((comp) => {
    const parentDir = directoryMap.get(comp.DirectoryId);
    if (parentDir) {
      parentDir.items.push({
        ItemProps: comp,
        items: [],
      });
    } else {
      console.warn(
        `Component with ID ${comp.Id} does not have a corresponding directory.`
      );
    }
  });

  // Build the hierarchy
  const hierarchy: TreeNodeProps["item"][] = [];

  directories.forEach((dir) => {
    if (dir.ParentDirectoryId === null || dir.ParentDirectoryId === 0) {
      // Top-level directory
      hierarchy.push(directoryMap.get(dir.Id)!);
    } else {
      const parentDir = directoryMap.get(dir.ParentDirectoryId);
      if (parentDir) {
        parentDir.items.push(directoryMap.get(dir.Id)!);
      } else {
        console.warn(
          `Parent directory with ID ${dir.ParentDirectoryId} not found.`
        );
      }
    }
  });

  // Log the final hierarchy
  // console.log("Final Hierarchy:", hierarchy);

  return hierarchy;
};

export default buildHierarchy;
