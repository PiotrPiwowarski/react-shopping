import {create} from 'zustand';

const useStore = create((set) => ({
    baseUrl: 'http://localhost:8080'
}));

export default useStore;