import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BackButtonBar from './BackButtonBar';
import axios from 'axios';
import {useState} from 'react';
import TitleBar from './TitleBar'

const EditItem = ({ baseUrl }) => {
	const location = useLocation();
	const { userId, item } = location.state || {};
	const navigate = useNavigate();

    const [shop, setShop] = useState(item.shop);
	const [productName, setProductName] = useState(item.productName);
	const [price, setPrice] = useState(item.price);
	const [amount, setAmount] = useState(item.amount);
	const [description, setDescription] = useState(item.description);
	const [errorMessage, setErrorMessage] = useState(item.message);

	const handleShopInput = (event) => {
		setShop(event.target.value.trim());
	};

	const handleProductNameInput = (event) => {
		setProductName(event.target.value.trim());
	};

	const handlePriceInput = (event) => {
		const value = event.target.value;
		if (!isNaN(Number(value))) {
			setPrice(value);
		} else {
			setErrorMessage('Cena musi być liczbą');
		}
	};

	const handleAmountInput = (event) => {
		const value = event.target.value;
		if (!isNaN(Number(value))) {
			setAmount(value);
		} else {
			setErrorMessage('Ilość musi być liczbą');
		}
	};

	const handleDescriptionInput = (event) => {
		setDescription(event.target.value.trim());
	};

	const handleAddItemButton = async () => {
		if (shop === '' || productName === '' || price === '' || amount === '') {
			setErrorMessage('wypełnij wszystkie wymagane pola formularza');
		} else {
			try {
				setErrorMessage('');
				const token = localStorage.getItem('jwtToken');
				await axios.put(
					`${baseUrl}/api/items`,
					{
                        id: item.id,
						shop: shop,
						productName: productName,
						price: price,
						amount: amount,
						description: description,
						imageUrl: null,
						userId: userId,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
                navigate('/display-items', {state: {userId}});
			} catch (error) {
				setErrorMessage('Wystąpił błąd podczas edycji produktu');
				console.error(error);
			}
		}
	};

	return (
		<div>
			<BackButtonBar userId={userId} />
			<TitleBar title='Edytuj produkt' />
			<div className='vertical-container'>
				<p className='error-message'>{errorMessage}</p>
				<label>
					podaj sklep
					<input type='text' value={shop} onChange={handleShopInput} />
				</label>
				<label>
					podaj nazwę produktu
					<input
						type='text'
						value={productName}
						onChange={handleProductNameInput}
					/>
				</label>
				<label>
					podaj cenę
					<input type='text' value={price} onChange={handlePriceInput} />
				</label>
				<label>
					podaj ilość
					<input type='text' value={amount} onChange={handleAmountInput} />
				</label>
				<label>
					podaj opis (opcjonalnie)
					<input
						type='text'
						value={description}
						onChange={handleDescriptionInput}
					/>
				</label>
				<button onClick={handleAddItemButton}>edytuj produkt</button>
			</div>
		</div>
	);
};

export default EditItem;
