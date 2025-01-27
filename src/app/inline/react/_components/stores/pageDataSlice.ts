import {
  CdnLinkDisplayDTO,
  ProjectDisplayDTO,
} from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import { InlineReactPageData } from "@/app/_assets/_api/_types/ITemplateTypes";
import { create } from "zustand";

interface PageDataState {
  pageData: InlineReactPageData | null;
  cdnLinks: CdnLinkDisplayDTO[];
  setCdnLinks: (links: CdnLinkDisplayDTO[]) => void;
  addedProperties: string[]; // Compiled Components Name are saved as variables in window. save them here.
  setAddedProperties: (newProperties: string[]) => void;
  setPageData: (data: InlineReactPageData) => void;
  projects: ProjectDisplayDTO[];
  setProjects: (newProjects: ProjectDisplayDTO[]) => void;
  error: string | null;
  setError: (error: string) => void;
}

const usePageDataStore = create<PageDataState>((set) => ({
  pageData: null,
  cdnLinks: [],
  addedProperties: [],
  projects: [],
  setProjects: (newProjects) => set({ projects: newProjects }),
  setCdnLinks: (links) => set({ cdnLinks: links }),
  setAddedProperties: (newProperties) =>
    set({ addedProperties: newProperties }),
  setPageData: (data) => set({ pageData: data }),
  error: null,
  setError: (error) => set({ error }),
}));
export default usePageDataStore;
