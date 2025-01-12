import {create} from 'zustand';

const useStore = create((set) => ({
    baseUrl: 'https://shopping-app-backend-hrnu.onrender.com'
}));

export default useStore;