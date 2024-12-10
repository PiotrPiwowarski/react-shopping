import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from './useStore';

const MenuBar = ({userId, setErrorMessage}) => {

	const navigate = useNavigate();
	const baseUrl = useStore(state => state.baseUrl);
	const handleLogoutButton = useStore(state => state.handleLogoutButton);

	const handleDeleteButton = async () => {
		try {
			const token = localStorage.getItem('jwtToken');
			await axios.delete(`${baseUrl}/api/users/${parseInt(userId)}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			navigate('/');
		} catch (error) {
			setErrorMessage('Błąd usuwania użytkownika');
		}
	};

	const handleAddItemButton = () => {
		navigate('/add-item', {state: {userId}});
	}

	return (
		<div className='headbar'>
			<button onClick={handleDeleteButton}>usuń konto</button>
			<button onClick={() => handleLogoutButton(navigate)}>wyloguj się</button>
			<button onClick={handleAddItemButton}>dodaj produkt</button>
		</div>
	);
};

export default MenuBar;
