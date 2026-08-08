"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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

export interface RemoteCrud<T extends WithId> {
  list: () => Promise<T[]>;
  create: (data: Omit<T, "id" | "order" | "createdAt" | "updatedAt">) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export interface CrudOptions<T extends WithId> {
  loadingDelay?: number;
  onError?: (error: Error) => void;
  remote?: RemoteCrud<T>;
}

type CreateData<T extends WithId> = Omit<T, "id" | "order" | "createdAt" | "updatedAt">;

function normalizeError(err: unknown): Error {
  return err instanceof Error ? err : new Error("An unexpected error occurred");
}

/**
 * Shared state + handlers for admin CRUD pages.
 * Local mock mode by default (seed + simulated delay); pass `remote` to
 * operate against the API — mutations then apply the server-returned rows,
 * so ids/order/timestamps always come from the server.
 */
export function useCrudResource<T extends WithId>(
  seed: T[],
  options: CrudOptions<T> = {}
) {
  const { loadingDelay = 300, onError: globalOnError, remote } = options;

  const [items, setItems] = useState<T[]>(remote ? [] : seed);
  const [isLoading, setIsLoading] = useState<boolean>(!!remote);
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

  useEffect(() => {
    if (!remote) return;
    let active = true;
    remote
      .list()
      .then((rows) => {
        if (active) setItems(rows);
      })
      .catch((err) => {
        if (active) setErrorState(normalizeError(err));
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [remote, setErrorState]);

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
    async (data: CreateData<T>, callbacks: CreateCallbacks<T> = {}): Promise<T> => {
      if (callbacks.onBeforeCreate && callbacks.onBeforeCreate(data) === false) {
        throw new Error("Create cancelled by onBeforeCreate");
      }

      if (remote) {
        try {
          const created = await remote.create(data);
          setItems((prev) => [...prev, created]);
          if (callbacks.onSuccess) callbacks.onSuccess(created);
          return created;
        } catch (err) {
          const normalized = normalizeError(err);
          setErrorState(normalized);
          if (callbacks.onError) callbacks.onError(normalized);
          throw normalized;
        }
      }

      const now = new Date().toISOString();
      const newItem = {
        ...(data as object),
        id: generateUniqueId(),
        order: items.length + 1,
        createdAt: now,
        updatedAt: now,
      } as T;

      previousItemsRef.current = deepClone(items);
      setItems((prev) => [...prev, newItem]);

      if (callbacks.onSuccess) callbacks.onSuccess(newItem);
      return newItem;
    },
    [remote, items, setErrorState]
  );

  const updateItem = useCallback(
    async (id: string, data: Partial<T>, callbacks: UpdateCallbacks<T> = {}): Promise<void> => {
      if (callbacks.onBeforeUpdate && callbacks.onBeforeUpdate(id, data) === false) {
        return;
      }

      if (remote) {
        try {
          const updated = await remote.update(id, data);
          setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
          if (callbacks.onSuccess) callbacks.onSuccess(updated);
          return;
        } catch (err) {
          const normalized = normalizeError(err);
          setErrorState(normalized);
          if (callbacks.onError) callbacks.onError(normalized);
          throw normalized;
        }
      }

      previousItemsRef.current = deepClone(items);
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          return { ...item, ...data, updatedAt: new Date().toISOString() } as T;
        })
      );
      if (callbacks.onSuccess) callbacks.onSuccess(undefined as unknown as T);
    },
    [remote, items, setErrorState]
  );

  const deleteItem = useCallback(
    async (id: string, callbacks: DeleteCallbacks = {}): Promise<void> => {
      if (callbacks.onBeforeDelete && callbacks.onBeforeDelete(id) === false) {
        return;
      }

      if (remote) {
        try {
          await remote.remove(id);
          setItems((prev) => prev.filter((item) => item.id !== id));
          if (callbacks.onSuccess) callbacks.onSuccess();
          return;
        } catch (err) {
          const normalized = normalizeError(err);
          setErrorState(normalized);
          if (callbacks.onError) callbacks.onError(normalized);
          throw normalized;
        }
      }

      previousItemsRef.current = deepClone(items);
      setItems((prev) => prev.filter((item) => item.id !== id));
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    [remote, items, setErrorState]
  );

  const runWithLoading = useCallback(
    async <R,>(fn: () => R | Promise<R>): Promise<R> => {
      setIsLoading(true);
      setErrorState(null);
      try {
        await sleep(loadingDelay);
        return await fn();
      } catch (err) {
        const normalized = normalizeError(err);
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