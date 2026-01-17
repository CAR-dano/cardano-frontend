"use client";

import { useToast } from "../../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Kelas "top-0" pada <Toast> ini mungkin tidak terlalu berpengaruh
          // jika ToastViewport sudah diposisikan di atas dan menggunakan flex.
          // Namun, tidak ada salahnya untuk dibiarkan jika itu adalah bagian dari desain awal Anda.
          <Toast className="top-0" key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      {/* Pastikan ToastViewport memiliki kelas untuk posisi tengah atas */}
      <ToastViewport className="top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4" />
    </ToastProvider>
  );
}
