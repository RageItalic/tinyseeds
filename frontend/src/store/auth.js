import create from 'zustand'

const useAuthStore = create((set) => ({
    //initial state
    user: null,

    //methods to mutate state
    setUser: (user) => set((state) => ({
        ...state,
        user
    }))
}))

export default useAuthStore