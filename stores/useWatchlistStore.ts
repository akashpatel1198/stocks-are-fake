import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchlistStore {
  symbols: string[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  isWatching: (symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      symbols: [],

      addSymbol: (symbol: string) => {
        const upper = symbol.toUpperCase();
        if (!get().symbols.includes(upper)) {
          set((state) => ({ symbols: [...state.symbols, upper] }));
        }
      },

      removeSymbol: (symbol: string) => {
        const upper = symbol.toUpperCase();
        set((state) => ({
          symbols: state.symbols.filter((s) => s !== upper),
        }));
      },

      isWatching: (symbol: string) => {
        return get().symbols.includes(symbol.toUpperCase());
      },
    }),
    {
      name: "watchlist",
    }
  )
);
