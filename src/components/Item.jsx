import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './useStore';

const Item = ({ item, setErrorMessage, refreshItems }) => {

	const [displayDetails, setDisplayDetails] = useState();
	const navigate = useNavigate();
	const baseUrl = useStore(state => state.baseUrl);

	const isOnline = () => {
		return navigator.onLine;
	};

	const handleBuyItem = async () => {

		if (!isOnline()) {
			setErrorMessage('Brak połączenia z internetem. Operacja zakupu niemożliwa.');
			return;
		}

		try {
			const token = localStorage.getItem('jwtToken');

			await axios.put(
				`${baseUrl}/api/items/buy/${parseInt(item.id)}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			refreshItems(baseUrl);
		} catch (error) {
			setErrorMessage('Zakup produktu się nie powiódł');
		}
	}

	const handleDisplayDetails = () => {
		setDisplayDetails(prev => !prev);
	}

	const handleDeleteItem = async () => {
		if (!isOnline()) {
			setErrorMessage('Brak połączenia z internetem. Operacja usuwania niemożliwa.');
			return;
		}

		const token = localStorage.getItem('jwtToken');

			await axios.delete(
				`${baseUrl}/api/items/${parseInt(item.id)}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			refreshItems(baseUrl);
	}

	const editItem = () => {
		if (!isOnline()) {
			setErrorMessage('Brak połączenia z internetem. Operacja edycji niemożliwa.');
			return;
		}
		navigate('/edit-item', {state: {item: item}})
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
					<button className='item-button' onClick={editItem}>edytuj</button>
				</div>
			</div>
		</div>
	);
};

export default Item;
