import create from 'zustand'


const usePlantStore = create((set) => ({
    //initial state
    plants: [],

    //methods to mutate state
    setPlants: (plants) => set((state) => ({
        ...state,
        plants
    }))
}))

export default usePlantStore