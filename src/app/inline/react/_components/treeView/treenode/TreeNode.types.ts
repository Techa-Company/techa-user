import {
  ProjectDirectoryDisplayDTO,
  ReactTemplateDisplayDTO,
} from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";

export interface TreeNodeProps {
  item: {
    ItemProps: ReactTemplateDisplayDTO | ProjectDirectoryDisplayDTO;
    items: TreeNodeProps["item"][];
  };
  isFolder: boolean;
  onClickDelete: (id: number, isFolder: boolean) => void;
  onMoveItem: (
    sourceId: number,
    isItFolder: boolean,
    destinationId: number
  ) => void;
  isAddingFolder: { directory_id?: number; isAdding: boolean };
  setIsAddingFolder: ({
    directory_id,
    isAdding,
  }: {
    directory_id?: number;
    isAdding: boolean;
  }) => void;
}
