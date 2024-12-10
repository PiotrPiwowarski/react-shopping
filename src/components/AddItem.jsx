import { useState } from 'react';
import TitleBar from './TitleBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButtonBar from './BackButtonBar';
import useStore from './useStore';

const AddItem = () => {
	const location = useLocation();
	const { userId } = location.state || {};
	const navigate = useNavigate();
	const baseUrl = useStore(state => state.basUrl);

	const [shop, setShop] = useState('');
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

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
				await axios.post(
					`${baseUrl}/api/items`,
					{
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
				setErrorMessage('Wystąpił błąd podczas dodawania produktu');
				console.error(error);
			}
		}
	};

	return (
		<div>
            <BackButtonBar userId={userId} />
			<TitleBar title='Twoje produkty' />
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
				<button onClick={handleAddItemButton}>dodaj produkt</button>
			</div>
		</div>
	);
};

export default AddItem;
