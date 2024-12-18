import {create} from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    baseUrl: 'http://localhost:8080',

    handleLogoutButton: async (navigate) => {
		try {
			const token = localStorage.getItem('jwtToken');
			await axios.post(
				`${useStore.getState().baseUrl}/api/users/logout`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			localStorage.removeItem('jwtToken');
			navigate('/');
		} catch (error) {
			console.error('Błąd wylogowania:', error);
		}
	}
}));

export default useStore;