import Background from './Background';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	const logInButtonHandler = () => {
		navigate('/login');
	};

	const registrationButtonHandler = () => {
		navigate('/registration');
	};

	return (
		<div>
			<h1>Shopply</h1>
            <h2>Home</h2>
			<button onClick={logInButtonHandler}>zaloguj się</button>
			<button onClick={registrationButtonHandler}>zarejestruj się</button>
		</div>
	);
};

export default Home;
