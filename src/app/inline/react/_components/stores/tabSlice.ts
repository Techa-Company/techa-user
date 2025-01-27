"use client";
import { create } from "zustand";

// Define the type for a tab
interface Tab {
  name: string;
  code: string;
  isEdited?: boolean;
  comment?: string;
  id?: number;
}

// Define the type for the state
interface TabsState {
  tabs: Tab[];
  activeTabName: string | null;
  createTab: (component: Tab) => void;
  decrement: (name: string) => void;
  setCurrentCode: (code: string, activeTabName: string) => void;
  setActiveTabName: (tabName: string) => void;
  selectFirstItem: () => Tab | undefined;
  currentTab: () => Tab;
  wipe: () => void;
}

const useTabsStore = create<TabsState>((set, get) => ({
  tabs: [],
  activeTabName: "",
  currentTab: () => {
    const { tabs, activeTabName } = get();
    const activeTab = tabs.find((t) => t.name === activeTabName);
    return activeTab as Tab;
  },
  wipe: () => set((state) => ({ tabs: [] })),
  createTab: (component: Tab) =>
    set((state) => {
      const sameTab = state.tabs.find((tab) => tab.name === component.name);
      if (!sameTab) {
        return {
          tabs: [
            ...state.tabs,
            {
              ...component,
              code: component.code,
              isEdited: false,
            },
          ],
          activeTabName: component.name,
        };
      } else {
        return { activeTabName: sameTab.name };
      }
      return state;
    }),

  decrement: (name: string) =>
    set((state) => {
      const newTabs = state.tabs.filter((tab) => tab.name !== name);
      return {
        tabs: newTabs,
        activeTabName: newTabs[0]?.name,
      };
    }),

  setCurrentCode: (code: string, activeIndex: string) =>
    set((state) => {
      const foundIndex = state.tabs.findIndex(
        (item) => item.name === activeIndex
      );
      if (foundIndex !== -1) {
        const updatedTabs = [...state.tabs];
        updatedTabs[foundIndex].code = code;
        updatedTabs[foundIndex].isEdited = true;
        return { tabs: updatedTabs };
      }
      return state;
    }),

  setActiveTabName: (activeTab: string) =>
    set(() => ({
      activeTabName: activeTab,
    })),

  getActiveTabName: () => {
    return get().activeTabName;
  },

  selectFirstItem: () => {
    return get().tabs[0];
  },
}));

export default useTabsStore;
