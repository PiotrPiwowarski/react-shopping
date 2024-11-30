import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import DisplayItems from './components/DisplayItems';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import AddItem from './components/AddItem';

const App = () => {
	const BASE_URL = 'http://localhost:8080';

	const handleLogoutButton = async (navigate) => {
		try {
			const token = localStorage.getItem('jwtToken');
			await axios.post(
				`${BASE_URL}/api/users/logout`,
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
	};

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login baseUrl={BASE_URL} />} />
				<Route
					path='/registration'
					element={<Registration baseUrl={BASE_URL} />}
				/>
				<Route
					path='/display-items'
					element={
						<DisplayItems
							baseUrl={BASE_URL}
							handleLogoutButton={(navigate) => handleLogoutButton(navigate)}
						/>
					}
				/>
				<Route path='/add-item' element={<AddItem baseUrl={BASE_URL} />} />
			</Routes>
		</Router>
	);
};

export default App;
