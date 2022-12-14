import create from 'zustand'


const useCartStore = create((set) => ({
    //initial state
    cart: [],

    //methods to mutate state
    addToCart: (type, oldCart, newItem = {}, existingPlantIndex = -1, maxCapacity = 10) => set((state) => {
        if (type === "NEW_ITEM") {
            return {
                ...state,
                cart: [...oldCart, newItem]
            }
        } else if (type === "UPDATE_INCREMENT_ITEM") {
            let newCart = [...oldCart]
            newCart[existingPlantIndex].qty < maxCapacity 
                ? newCart[existingPlantIndex].qty += 1
                : newCart[existingPlantIndex].qty = maxCapacity

            return {
                ...state,
                cart: newCart
            }

        } else if (type === "UPDATE_DECREMENT_ITEM") {
            let newCart = [...oldCart]
            newCart[existingPlantIndex].qty > 0 
                ? newCart[existingPlantIndex].qty -= 1 
                : newCart[existingPlantIndex].qty = 0

            return {
                ...state,
                cart: newCart
            }

        } else if (type === "LOAD_EXISTING_CART") {
            return {
                ...state,
                cart: [...oldCart]
            }
        } 
        else if (type === "UPDATE_QUANTITY_AMOUNT") {
            let newCart = [...oldCart]
            let updatedCart = [...oldCart]
            console.log(newCart[existingPlantIndex].qty)
            console.log("New Cart Quantity" + newItem.qty)
            let total = parseInt(newItem.qty,10) + parseInt(newCart[existingPlantIndex].qty,10) 
            if(total > 10) {
                alert("Out of stock");
            }
            else {
            // console.log("New Quantity" + newItem.qty + newCart[existingPlantIndex].qty)
            console.log("Total: " + total)
            updatedCart[existingPlantIndex].qty < maxCapacity 
                ? updatedCart[existingPlantIndex].qty = total
                : updatedCart[existingPlantIndex].qty = maxCapacity
            }
            return {
                ...state,
                cart: updatedCart
            }

        }
        else {
            console.error("Wrong type or no type passed into addToCart method")
            return null
        }
    }),

    removeFromCart: (oldCart, plantId) => set((state) => ({
        ...state,
        cart: oldCart.filter(plants => plants.id !== plantId)
    }))


}))

export default useCartStore