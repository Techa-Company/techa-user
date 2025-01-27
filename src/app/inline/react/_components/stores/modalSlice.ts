import { create } from "zustand";

interface ModalState {
  isChooseDatabaseModalVisible: boolean;
  isSaveModalVisible: boolean;
  isSaveDialogModalVisible: boolean;
  isImportModalVisible: boolean;
  isSPModalVisible: boolean;
  isComponentsModalVisible: boolean;
  isNewTabModalVisible: boolean;
  isCdnLinkModalVisible: boolean;
  setModalVisibility: (
    modal: keyof Omit<ModalState, "setModalVisibility">,
    visible: boolean
  ) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isChooseDatabaseModalVisible: false,
  isSaveModalVisible: false,
  isSaveDialogModalVisible: false,
  isImportModalVisible: false,
  isSPModalVisible: false,
  isComponentsModalVisible: false,
  isNewTabModalVisible: false,
  isCdnLinkModalVisible: false,
  setModalVisibility: (modal, visible) => set({ [modal]: visible }),
}));

export default useModalStore;
