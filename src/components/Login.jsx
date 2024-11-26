import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headbar from './Headbar';
import TitleBar from './TitleBar';

const Login = ({ baseUrl }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleEmailInput = (event) => {
		setEmail(event.target.value.trim());
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value.trim());
	};

	const storeToken = (token) => {
		localStorage.setItem('jwtToken', token);
	};

	const handleLoginButton = async () => {
		if (email === '' || password === '') {
			setError('wypełnij wszystkie pola formularza');
		} else {
			try {
				setError('');
				const response = await axios.post(`${baseUrl}/api/users/login`, {
					email: email,
					password: password,
				});
				if (response.status === 200) {
					const token = response.data.token;
					const userId = response.data.userId;
					storeToken(token);
					navigate('/display-items', {state: {userId}});
				} else {
					setError('Błąd logowania');
				}
			} catch (error) {
				setError('Wystąpił błąd podczas logowania');
				console.error(error);
			}
		}
	};

	return (
		<div>
			<Headbar />
			<TitleBar title='Zaloguj się' />
			<div className='vertical-container'>
				<p className='error-message'>{error}</p>
				<label>
					podaj email
					<input type='text' value={email} onInput={handleEmailInput} />
				</label>
				<label>
					podaj hasło
					<input
						type='password'
						value={password}
						onInput={handlePasswordInput}
					/>
				</label>
				<button onClick={handleLoginButton}>zaloguj się</button>
			</div>
		</div>
	);
};

export default Login;
