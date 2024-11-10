import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Background from './Background';

const Registration = ({ baseUrl }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPassword, setRepeatedPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleEmailInput = (event) => {
		setEmail(event.target.value.trim());
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value.trim());
	};

	const handleRepeatedPasswordInput = (event) => {
		setRepeatedPassword(event.target.value.trim());
	};

	const handleRegisterButton = async () => {
		if (email === '' || password === '' || repeatedPassword === '') {
			setError('Wypełnij wszystkie pola formularza');
		} else if (password.length < 4) {
			setError('Zbyt krótkie hasło');
		} else if (password !== repeatedPassword) {
			setError('Powtórzone hasło się różni względem orginalnego');
		} else {
			try {
				setError('');
				const response = await axios.post(`${baseUrl}/api/users/register`, {
					email: email,
					password: password,
				});
				if (response.status === 200) {
					navigate('/login');
				} else {
					setError('Rejestracja nie powiodła się');
				}
			} catch (error) {
				setError('Wystąpił błąd podczas rejestracji');
				console.error(error);
			}
		}
	};

	return (
		<div>
            <h1>Shopply</h1>
			<h2>Rejestracja</h2>
			<p>{error}</p>
			<label>
				podaj email
				<input type='text' value={email} onInput={handleEmailInput} />
			</label>
			<label>
				podaj hasło
				<input type='password' value={password} onInput={handlePasswordInput} />
			</label>
			<label>
                powtórz hasło
				<input type='password' value={repeatedPassword} onInput={handleRepeatedPasswordInput} />
			</label>
			<button onClick={handleRegisterButton}>zarejestruj się się</button>
		</div>
	);
};

export default Registration;
