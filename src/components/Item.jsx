import axios from 'axios';

const Item = ({ baseUrl, item, setErrorMessage, refreshItems }) => {

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

	return (
		<div className='vertical-container item-container '>
			<h3>{item.productName}</h3>
			<p>Sklep: {item.shop}</p>
			<p>Cena: {item.price}</p>
			<p>Ilość produktu: {item.amount}</p>
			<p>Status produktu: {item.bought ? 'kupiony':'kup'}</p>
			<div>
				<div>
					<button className='item-button' onClick={handleBuyItem}>{item.bought ? 'kupiony':'kup'}</button>
					<button className='item-button'>usuń</button>
				</div>
				<div>
					<button className='item-button'>szczegóły</button>
					<button className='item-button'>edytuj</button>
				</div>
			</div>
		</div>
	);
};

export default Item;
