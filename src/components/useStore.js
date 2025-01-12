import {create} from 'zustand';

const useStore = create((set) => ({
    baseUrl: 'https://shopping-app-backend-neon.vercel.app'
}));

export default useStore;