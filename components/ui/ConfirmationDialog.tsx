"use client";

import { useState, useCallback } from "react";
import { Modal } from "./Modal";

/**
 * Confirmation dialog for delete operations
 */
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  danger = true,
  isLoading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  isLoading?: boolean;
}) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="space-y-4">
        <p className="text-body-md text-text-secondary">{message}</p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-body-sm text-text-secondary hover:text-text hover:bg-surface-elevated rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-body-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              danger
                ? "bg-error text-white hover:bg-red-600"
                : "bg-secondary text-on-secondary hover:bg-secondary-dim"
            } ${isLoading ? "flex items-center gap-2" : ""}`}
          >
            {isLoading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  className="opacity-75"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="12 6"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Hook for delete confirmation
 */
export function useDeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name?: string;
    onConfirm: () => void;
  } | null>(null);

  const confirmDelete = useCallback((
    id: string,
    onConfirm: () => void,
    name?: string
  ) => {
    setPendingDelete({ id, name, onConfirm });
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    if (pendingDelete) {
      pendingDelete.onConfirm();
      setIsOpen(false);
      setPendingDelete(null);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setPendingDelete(null);
  };

  return {
    ConfirmationDialog: () => (
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        message={pendingDelete?.name ? `Are you sure you want to delete "${pendingDelete.name}"? This action cannot be undone.` : "Are you sure you want to delete this item? This action cannot be undone."}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />
    ),
    confirmDelete,
  };
}
