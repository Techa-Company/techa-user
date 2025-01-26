import { ProjectDirectoryDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import { create } from "zustand";

interface DirectoryState {
  directories: ProjectDirectoryDisplayDTO[];
  setDirectories: (directories: ProjectDirectoryDisplayDTO[]) => void;
  error: string | null;
  setError: (error: string) => void;
}

const useDirectoryStore = create<DirectoryState>((set) => ({
  directories: [],
  setDirectories: (directories) => set({ directories }),
  error: null,
  setError: (error) => set({ error }),
}));

export default useDirectoryStore;
