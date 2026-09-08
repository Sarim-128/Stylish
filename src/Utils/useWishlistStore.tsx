import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Wishlist from "../screens/Post_Login/Wishlist";
import { mmkvStorage } from "./storage";


export const useWishlistStore = create(

    persist(
        (set) => ({
            wishlist: [],

            addToWishlist: (item: any) =>
                set((state: any) => {

                    const alreadyExsists = state.wishlist.some((i: any) => i.id === item.id)
                    if (alreadyExsists) return state

                    return { wishlist: [...state.wishlist, item] }
                }),

            removeFromWishlist: (id: any) =>
                set((state: any) => ({
                    wishlist: state.wishlist.filter((item: any) => item.id !== id)
                }))
        }),

        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)