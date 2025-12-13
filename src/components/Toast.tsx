import React from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToast, type ToastType } from "../context/ToastContext";

const iconMap: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertClassMap: Record<ToastType, string> = {
  success: "alert-success",
  error: "alert-error",
  warning: "alert-warning",
  info: "alert-info",
};

/**
 * Toast - Renders toast notifications from the ToastContext.
 * Place this component once at the root level (e.g., in App.tsx).
 */
const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast toast-bottom toast-end z-50">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div
            key={toast.id}
            className={`alert ${alertClassMap[toast.type]} shadow-lg animate-fade-in`}
          >
            <Icon size={20} />
            <span>{toast.message}</span>
            <button
              className="btn btn-ghost btn-xs btn-circle"
              onClick={() => removeToast(toast.id)}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
