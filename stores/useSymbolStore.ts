import { create } from "zustand";

export interface Symbol {
  symbol: string;
  description: string;
  type: string;
}

interface SymbolStore {
  symbols: Symbol[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchSymbols: () => Promise<void>;
}

export const useSymbolStore = create<SymbolStore>((set, get) => ({
  symbols: [],
  loading: false,
  error: null,
  hasFetched: false,

  fetchSymbols: async () => {
    // Skip if already fetched
    if (get().hasFetched) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/symbols");
      if (!res.ok) throw new Error("Failed to fetch symbols");
      const data = await res.json();
      set({ symbols: data, hasFetched: true });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Failed to load symbols" });
    } finally {
      set({ loading: false });
    }
  },
}));
