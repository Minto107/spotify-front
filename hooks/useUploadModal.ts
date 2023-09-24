import { create } from "zustand";

interface store {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModal = create<store>((set) => ({isOpen: false, onOpen: () => set({isOpen: true}), onClose: () => set({isOpen: false})}));

export default useUploadModal;