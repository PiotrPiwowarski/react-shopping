import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from './useStore';

const MenuBar = ({ setErrorMessage, refreshItems }) => {
	const navigate = useNavigate();
	const baseUrl = useStore((state) => state.baseUrl);

	const handleDeleteButton = async () => {
		try {
			const token = localStorage.getItem('jwtToken');
			const userId = localStorage.getItem('userId');

			await axios.delete(`${baseUrl}/api/users/${parseInt(userId)}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			navigate('/');
		} catch (error) {
			setErrorMessage('Błąd usuwania użytkownika');
			navigate('/');
		}
	};
	const handleLogoutButton = async () => {
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
			localStorage.removeItem('userId');
			localStorage.removeItem('logged');
			navigate('/home');
		} catch (error) {
			console.error('Błąd wylogowania:', error);
		}
	};

	const handleAddItemButton = () => {
		navigate('/add-item');
	};

	const handleRefreshButton = () => {
		refreshItems(baseUrl);
	};

	return (
		<div className='headbar'>
			<button onClick={handleDeleteButton}>usuń konto</button>
			<button onClick={() => handleLogoutButton(navigate)}>wyloguj się</button>
			<button onClick={handleAddItemButton}>dodaj produkt</button>
			<button onClick={handleRefreshButton}>odśwież</button>
		</div>
	);
};

export default MenuBar;
