import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import DisplayItems from './components/DisplayItems';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

const App = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(localStorage.getItem(isLoggedIn));
	}, []);

	return (
		<Router>
			<Routes>
				<Route path='/' element={isLoggedIn ? <Navigate to='/display-items' /> : <Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/display-items' element={<DisplayItems />} />
				<Route path='/add-item' element={<AddItem />} />
				<Route path='/edit-item' element={<EditItem />} />
			</Routes>
		</Router>
	);
};

export default App;
