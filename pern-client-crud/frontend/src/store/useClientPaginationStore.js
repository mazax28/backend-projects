import {create} from 'zustand';



export const useClientPaginationStore = create((set) => ({
    page: 1,
    nextPage: () => set((state) => ({ page: state.page + 1 })),
    prevPage: () => set((state) => ({ page: Math.max(1, state.page - 1) })),
    limit: 5,
    setLimit: (limit) => set({limit}),

    searchTerm: '',
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    resetSearchTerm: () => set({ searchTerm: '' }),
   
}));