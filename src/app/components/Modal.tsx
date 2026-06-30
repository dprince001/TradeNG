
import React, { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose, className = '' }: ModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className={`mx-4 bg-white rounded-3xl p-6 pointer-events-auto w-full max-w-md ${className}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
