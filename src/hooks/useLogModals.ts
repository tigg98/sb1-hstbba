import { useState } from 'react';
import type { ActivityType } from '../types/activity';

interface ModalState {
  isOpen: boolean;
  onClose: () => void;
}

export function useLogModals() {
  const [modals, setModals] = useState<Record<string, ModalState>>({
    meals: { isOpen: false, onClose: () => closeModal('meals') },
    exercise: { isOpen: false, onClose: () => closeModal('exercise') },
    supplements: { isOpen: false, onClose: () => closeModal('supplements') },
    water: { isOpen: false, onClose: () => closeModal('water') },
    skin: { isOpen: false, onClose: () => closeModal('skin') },
    alcohol: { isOpen: false, onClose: () => closeModal('alcohol') }
  });

  const openModal = (type: ActivityType) => {
    setModals(prev => ({
      ...prev,
      [type]: { ...prev[type], isOpen: true }
    }));
  };

  const closeModal = (type: ActivityType) => {
    setModals(prev => ({
      ...prev,
      [type]: { ...prev[type], isOpen: false }
    }));
  };

  return { modals, openModal, closeModal };
}