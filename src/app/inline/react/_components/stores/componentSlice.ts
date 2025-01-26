import { ReactTemplateDisplayDTO as ReactTemplate } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import { create } from "zustand";

interface ComponentState {
  components: ReactTemplate[];
  addComponent: (component: ReactTemplate) => void;
  removeComponent: (index: number) => void;
  setComponents: (components: ReactTemplate[]) => void;
  toggleIsImported: (id: number) => void; // New function to toggle isImported
}

const useComponentStore = create<ComponentState>((set) => ({
  components: [],
  addComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  removeComponent: (index) =>
    set((state) => ({
      components: state.components.filter((_, i) => index !== _.Id),
    })),
  setComponents: (components) =>
    set((state) => ({
      components: components,
    })),
  toggleIsImported: (id) =>
    set((state) => ({
      components: state.components.map((component) =>
        component.Id === id
          ? { ...component, isImported: !component.isImported }
          : component
      ),
    })),
}));

export default useComponentStore;
