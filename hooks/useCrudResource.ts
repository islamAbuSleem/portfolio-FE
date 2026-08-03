"use client";

import { useState, useCallback, useRef } from "react";
import { generateUniqueId, sleep, deepClone } from "@/lib/utils";

interface WithId {
  id: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCallbacks<T extends WithId> {
  onBeforeCreate?: (data: Omit<T, "id" | "order" | "createdAt" | "updatedAt">) => boolean | void;
  onSuccess?: (createdItem: T) => void;
  onError?: (error: Error) => void;
}

export interface UpdateCallbacks<T extends WithId> {
  onBeforeUpdate?: (id: string, data: Partial<T>) => boolean | void;
  onSuccess?: (updatedItem: T) => void;
  onError?: (error: Error) => void;
}

export interface DeleteCallbacks {
  onBeforeDelete?: (id: string) => boolean | void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface CrudOptions {
  loadingDelay?: number;
  onError?: (error: Error) => void;
}

type CreateData<T extends WithId> = Omit<T, "id" | "order" | "createdAt" | "updatedAt">;

/**
 * Shared state + handlers for admin CRUD pages.
 * Works against local mock data until the API is wired up, with loading
 * and error handling already in place so the swap to real endpoints is seamless.
 */
export function useCrudResource<T extends WithId>(
  seed: T[],
  options: CrudOptions = {}
) {
  const { loadingDelay = 300, onError: globalOnError } = options;

  const [items, setItems] = useState<T[]>(seed);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const previousItemsRef = useRef<T[]>([]);

  const setErrorState = useCallback(
    (err: Error | null) => {
      setError(err);
      if (err && globalOnError) globalOnError(err);
    },
    [globalOnError]
  );

  const openCreateModal = useCallback(() => {
    setEditingItem(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((item: T) => {
    setEditingItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingItem(null);
    setErrorState(null);
  }, [setErrorState]);

  const createItem = useCallback(
    (data: CreateData<T>, callbacks: CreateCallbacks<T> = {}): T => {
      if (callbacks.onBeforeCreate && callbacks.onBeforeCreate(data) === false) {
        throw new Error("Create cancelled by onBeforeCreate");
      }

      const now = new Date().toISOString();
      const newItem = {
        ...(data as object),
        id: generateUniqueId(),
        order: items.length + 1,
        createdAt: now,
        updatedAt: now,
      } as T;

      setItems((prev) => {
        previousItemsRef.current = deepClone(prev);
        return [...prev, newItem];
      });

      if (callbacks.onSuccess) callbacks.onSuccess(newItem);
      return newItem;
    },
    [items.length]
  );

  const updateItem = useCallback((id: string, data: Partial<T>, callbacks: UpdateCallbacks<T> = {}): void => {
    if (callbacks.onBeforeUpdate && callbacks.onBeforeUpdate(id, data) === false) {
      return;
    }

    setItems((prev) => {
      previousItemsRef.current = deepClone(prev);
      return prev.map((item) => {
        if (item.id !== id) return item;
        const updatedItem = { ...item, ...data, updatedAt: new Date().toISOString() } as T;
        if (callbacks.onSuccess) callbacks.onSuccess(updatedItem);
        return updatedItem;
      });
    });
  }, []);

  const deleteItem = useCallback((id: string, callbacks: DeleteCallbacks = {}): void => {
    if (callbacks.onBeforeDelete && callbacks.onBeforeDelete(id) === false) {
      return;
    }

    setItems((prev) => {
      previousItemsRef.current = deepClone(prev);
      const filtered = prev.filter((item) => item.id !== id);
      if (filtered.length !== prev.length && callbacks.onSuccess) {
        callbacks.onSuccess();
      }
      return filtered;
    });
  }, []);

  const runWithLoading = useCallback(
    async <R,>(fn: () => R | Promise<R>): Promise<R> => {
      setIsLoading(true);
      setErrorState(null);
      try {
        await sleep(loadingDelay);
        return await fn();
      } catch (err) {
        const normalized =
          err instanceof Error ? err : new Error("An unexpected error occurred");
        setErrorState(normalized);
        throw normalized;
      } finally {
        setIsLoading(false);
      }
    },
    [loadingDelay, setErrorState]
  );

  const createItemWithLoading = useCallback(
    (data: CreateData<T>, callbacks: CreateCallbacks<T> = {}): Promise<T> =>
      runWithLoading(() => createItem(data, callbacks)),
    [runWithLoading, createItem]
  );

  const updateItemWithLoading = useCallback(
    (id: string, data: Partial<T>, callbacks: UpdateCallbacks<T> = {}): Promise<void> =>
      runWithLoading(() => updateItem(id, data, callbacks)),
    [runWithLoading, updateItem]
  );

  const deleteItemWithLoading = useCallback(
    (id: string, callbacks: DeleteCallbacks = {}): Promise<void> =>
      runWithLoading(() => deleteItem(id, callbacks)),
    [runWithLoading, deleteItem]
  );

  const resetToPreviousState = useCallback(() => {
    if (previousItemsRef.current.length > 0) {
      setItems(deepClone(previousItemsRef.current));
      previousItemsRef.current = [];
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    items,
    isLoading,
    error,
    isModalOpen,
    editingItem,
    openCreateModal,
    openEditModal,
    closeModal,
    createItem,
    updateItem,
    deleteItem,
    createItemWithLoading,
    updateItemWithLoading,
    deleteItemWithLoading,
    resetToPreviousState,
    clearError,
  };
}
