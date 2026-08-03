import React, { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';

interface ResponsiveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!isOpen) return null;

  // Desktop Dialog View (>= 768px)
  if (isDesktop) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] z-10 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between shrink-0">
            <div>
              {title && (
                <h3 className="text-xl font-bold text-[#0F172A] font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-[#475569] mt-0.5">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0]/50 rounded-full transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Mobile Bottom Sheet / Drawer View (< 768px) using Vaul
  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-white rounded-t-[24px] outline-none shadow-2xl border-t border-[#CBD5E1]">
          {/* Drag Handle Indicator */}
          <div className="pt-3 pb-2 flex justify-center shrink-0 bg-[#F8FAFC] rounded-t-[24px]">
            <div className="w-12 h-1.5 bg-[#CBD5E1] rounded-full" />
          </div>

          {/* Drawer Header */}
          {(title || subtitle) && (
            <div className="px-5 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between shrink-0">
              <div>
                {title && (
                  <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs text-[#475569] mt-0.5">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#64748B] hover:text-[#0F172A] bg-[#E2E8F0] rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Drawer Body */}
          <div className="p-5 overflow-y-auto flex-1">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
