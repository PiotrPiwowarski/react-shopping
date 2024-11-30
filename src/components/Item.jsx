import axios from 'axios';
import {useState} from 'react';

const Item = ({ baseUrl, item, setErrorMessage, refreshItems }) => {

	const [displayDetails, setDisplayDetails] = useState();

	const handleBuyItem = async () => {
		try {
			const token = localStorage.getItem('jwtToken');

			await axios.put(
				`${baseUrl}/api/items/buy/${parseInt(item.id)}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			refreshItems();
		} catch (error) {
			setErrorMessage('Zakup produktu się nie powiódł');
		}
	}

	const handleDisplayDetails = () => {
		setDisplayDetails(prev => !prev);
	}

	const handleDeleteItem = async () => {
		const token = localStorage.getItem('jwtToken');

			await axios.delete(
				`${baseUrl}/api/items/${parseInt(item.id)}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			refreshItems();
	}

	return (
		<div className='vertical-container item-container '>
			<h3>{item.productName}</h3>
			<p>Sklep: {item.shop}</p>
			<p>Status produktu: {item.bought ? 'kupiony':'kup'}</p>
			{
				displayDetails && 
				<div className='vertical-container'>
					<p>Cena: {item.price}</p>
					<p>Ilość produktu: {item.amount}</p>
					<p>{item.description}</p>
				</div>
			}
			<div>
				<div>
					<button className='item-button' onClick={handleBuyItem}>{item.bought ? 'kupiony':'kup'}</button>
					<button className='item-button' onClick={handleDeleteItem}>usuń</button>
				</div>
				<div>
					<button className='item-button' onClick={handleDisplayDetails}>szczegóły</button>
					<button className='item-button'>edytuj</button>
				</div>
			</div>
		</div>
	);
};

export default Item;
