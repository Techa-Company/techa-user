import { ProjectDirectoryDisplayDTO } from "@/app/assets/api/types/dtos/InlineReactDtos";
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
