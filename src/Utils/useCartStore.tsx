import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

export const useCartStore = create(
    persist(
        (set) => ({
            cart: [],

            addToCart: (item: any) =>
                set((state: any) => {
                    const exsistingItem = state.cart.find((i: any) => i.id === item.id)

                    if (exsistingItem) {
                        return {
                            cart: state.cart.map((i: any) => i.id === item.id ?
                                { ...i, quantity: (i.quantity || 1) + 1 }
                                :
                                i
                            )
                        }
                    }

                    return { cart: [...state.cart, { ...item, quantity: 1 }] }
                }),

            removeFromCart: (id: any) =>
                set((state: any) => ({
                    cart: state.cart.filter((item: any) => item.id !== id)
                })),

            updateQuantity: (id: any, type: string) =>
                set((state: any) => ({
                    cart: state.cart.map((item: any) => {

                        if (String(item.id) === String(id)) {
                            const currentQty = Number(item.quantity) || 1;
                            const newQty = type === 'increase' ? currentQty + 1 : currentQty - 1

                            if (newQty <= 0) return null

                            return {...item, quantity: newQty}
                        }

                        return item 
                    })
            .filter(Boolean)
                })),

clearCart: () => set({ cart: [] })
        }),

{
    name: 'cart-storage',
        storage: createJSONStorage(() => mmkvStorage)
}
    )
)