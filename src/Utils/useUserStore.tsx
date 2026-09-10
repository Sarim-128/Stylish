import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { mmkvStorage } from "./storage"



interface UserState {
    profileImageUri: string | null
    setProfileImageUri: (uri: string | null) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profileImageUri: null,

            setProfileImageUri: (uri) => set({ profileImageUri: uri })
        }),

        {
            name: 'user-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)