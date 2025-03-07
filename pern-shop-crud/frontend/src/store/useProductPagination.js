import {create} from 'zustand';

export const useProductPagination = create((set) => ({
    page: 1,
    limit: 10,
    setLimit: (limit) => set({limit}),
    setPage: (page) => set({page}),
    nextPage: () => set((state) => ({page: state.page + 1})),
    prevPage: () => set((state) => ({page: state.page - 1})),
    searchTerm: '',
    setSearchTerm: (searchTerm) => set({searchTerm}),


}))