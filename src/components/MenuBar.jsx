import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuBar = ({baseUrl, userId, setErrorMessage}) => {

	const navigate = useNavigate();

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

	const handleLogoutButton = async () => {
		try {
			const token = localStorage.getItem('jwtToken');
			await axios.post(
				`${baseUrl}/api/users/logout`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			localStorage.removeItem('jwtToken');
			navigate('/')
		} catch(error) {
			setErrorMessage('Błąd wylogowania');
		}
	}

	return (
		<div className='headbar'>
			<button onClick={handleDeleteButton} className='delete-button'>usuń konto</button>
			<button onClick={handleLogoutButton}>wyloguj się</button>
			<button>filtruj</button>
			<button>dodaj produkt</button>
		</div>
	);
};

export default MenuBar;
