import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DisplayItems from './components/DisplayItems';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
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
