import { EModalID } from 'src/modals/ModalsFactory';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  modalType: EModalID;
  source: 'queryParam' | 'state';
  modalProps: Record<string, any>;
  openModal: (
    modalType: EModalID,
    modalProps?: Record<string, any>,
    // Whether the modal was opened from a router query param or from a state change
    source?: 'queryParam' | 'state',
  ) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  modalType: '' as EModalID,
  source: 'state',
  modalProps: {},
  openModal: (modalType, modalProps = {}, source = 'state') => {
    return set({ isOpen: true, modalType, source, modalProps });
  },
  closeModal: () => {
    return set({ isOpen: false });
  },
}));

export default useModalStore;
