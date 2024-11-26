import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import MenuBar from './MenuBar';
import TitleBar from './TitleBar';
import { useLocation } from 'react-router-dom';

const DisplayItems = ({ baseUrl }) => {
	const location = useLocation();
	const { userId } = location.state || {};

	const [user, setUser] = useState('');
	const [items, setItems] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!userId) {
			setErrorMessage('brak id użytkownika...');
			return;
		}
		const fetchItems = async () => {
			try {
				const token = localStorage.getItem('jwtToken');

				const itemsResponse = await axios.get(
					`${baseUrl}/api/items/${parseInt(userId)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const userResponse = await axios.get(
					`${baseUrl}/api/users/${parseInt(userId)}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setItems(itemsResponse.data);
				setUser(userResponse.data);
			} catch (error) {
				setErrorMessage('Pobranie listy produktów się nie powiodło');
			}
		};

		fetchItems();
	}, [userId, baseUrl]);

	return (
		<div>
			<MenuBar baseUrl={baseUrl} userId={userId} setErrorMessage={setErrorMessage} />
			<TitleBar title='Twoje produkty' />
			<div className='vertical-container'>
				<p>Cześć {user.email}!</p>
				<p className='error-message'>{errorMessage}</p>
				{items.map((item) => {
					return <Item key={item.id} item={item} baseUrl={baseUrl} />;
				})}
			</div>
		</div>
	);
};

export default DisplayItems;
