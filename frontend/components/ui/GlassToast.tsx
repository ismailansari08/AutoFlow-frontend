'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

const typeConfig = {
  success: {
    bg: 'var(--alert-success-bg)',
    border: 'var(--alert-success-border)',
    icon: CheckCircle,
    color: '#34D399',
  },
  error: {
    bg: 'var(--alert-error-bg)',
    border: 'var(--alert-error-border)',
    icon: AlertCircle,
    color: '#F87171',
  },
  info: {
    bg: 'var(--alert-info-bg)',
    border: 'var(--alert-info-border)',
    icon: Info,
    color: '#A5B4FC',
  },
  warning: {
    bg: 'var(--alert-warn-bg)',
    border: 'var(--alert-warn-border)',
    icon: AlertCircle,
    color: '#FBBF24',
  },
};

interface GlassToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const GlassToast: React.FC<GlassToastProps> = ({ toast, onClose }) => {
  const config = typeConfig[toast.type];
  const Icon = config.icon;

  React.useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => onClose(toast.id), toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl backdrop-blur-lg border shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
      style={{
        background: config.bg,
        borderColor: config.border,
      }}
    >
      <Icon size={18} style={{ color: config.color, flexShrink: 0 }} />
      <span
        className="text-sm font-medium flex-1"
        style={{ color: config.color }}
      >
        {toast.message}
      </span>
      <button
        onClick={() => onClose(toast.id)}
        className="p-1 rounded-lg transition-colors hover:bg-white/10"
        style={{ color: config.color }}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

interface GlassToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const GlassToastContainer: React.FC<GlassToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 max-w-sm pointer-events-auto">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <GlassToast
            key={toast.id}
            toast={toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

/**
 * Hook for managing toast notifications
 */
export const useGlassToast = () => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = (
    message: string,
    type: ToastType = 'info',
    duration = 3000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message: string, duration?: number) =>
    addToast(message, 'success', duration);
  const error = (message: string, duration?: number) =>
    addToast(message, 'error', duration);
  const info = (message: string, duration?: number) =>
    addToast(message, 'info', duration);
  const warning = (message: string, duration?: number) =>
    addToast(message, 'warning', duration);

  return { toasts, addToast, removeToast, success, error, info, warning };
};
