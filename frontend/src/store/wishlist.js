import create from 'zustand'


const useWishlistStore = create((set) => ({
    //initial state
    wishlist: [],

    //methods to mutate state
    addToWishlist: (plant, type, existingWishlist) => set((state) => {
        if (type === "LOAD_EXISTING_WISHLIST") {
            return {
                ...state,
                wishlist: [...existingWishlist]
            }
        } else {
            return {
                ...state,
                wishlist: [...state.wishlist, plant]
            }
        }
    }),

    removeFromWishlist: (oldWishlist, plantId) => set((state) => ({
        ...state,
        wishlist: oldWishlist.filter(plant => plant.id !== plantId)
    }))



}))

export default useWishlistStore