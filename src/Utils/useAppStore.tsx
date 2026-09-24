import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { mmkvStorage } from "./storage"




interface AppState {
    hasSeenOnboarding: boolean
    setHasSeenOnboarding: (value: boolean) => void
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            hasSeenOnboarding: false,

            setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
        }),

        {
            name: 'app-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)