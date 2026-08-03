"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/components/icons/SocialIcons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ isOpen, onClose, title, children, className = "", size = "md" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevOverflowRef = useRef<string>("");
  const prevActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && contentRef.current) {
        const focusable = Array.from(
          contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    prevActiveRef.current = document.activeElement as HTMLElement | null;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const btn = closeBtnRef.current;
    if (btn) btn.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflowRef.current;
      if (prevActiveRef.current && typeof prevActiveRef.current.focus === "function") {
        prevActiveRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current === e.target) onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || typeof window === "undefined") return null;

  const closeBtn = (
    <button
      ref={closeBtnRef}
      onClick={onClose}
      className="p-1.5 rounded-lg text-text-secondary hover:text-text hover:bg-surface-elevated transition-colors"
      aria-label="Close modal"
    >
      <CloseIcon width={20} height={20} />
    </button>
  );

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={contentRef}
        className={`glass w-full ${sizeClasses[size]} opacity-0 animate-[zoomIn95_0.2s_ease-out_forwards] rounded-2xl ${className}`}
      >
        {title ? (
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 id="modal-title" className="text-headline-sm font-semibold text-text">{title}</h2>
            {closeBtn}
          </div>
        ) : (
          <div className="flex justify-end p-5">{closeBtn}</div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
