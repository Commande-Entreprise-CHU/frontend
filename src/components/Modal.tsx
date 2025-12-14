import { useEffect, useRef, type FC, type ReactNode, type SyntheticEvent } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md",
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  // Handle ESC key manually if needed, but <dialog> handles it by default.
  // However, we want to sync the state.
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault(); // Prevent default close to handle it via props
    onClose();
  };

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size];

  return (
    <dialog ref={modalRef} className="modal" onCancel={handleCancel}>
      <div className={`modal-box ${sizeClass}`}>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </form>
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        <div className="py-2">{children}</div>
        {actions && <div className="modal-action">{actions}</div>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
