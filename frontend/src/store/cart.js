import create from 'zustand'


const useCartStore = create((set) => ({
    //initial state
    cart: [],

    //methods to mutate state
    addToCart: (cart) => set((state) => ({
        ...state,
        cart
    }))
}))

export default useCartStore