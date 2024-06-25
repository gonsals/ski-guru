import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <span
                    className="close text-right text-2xl cursor-pointer"
                    onClick={onClose}
                >
                    &times;
                </span>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
