import { useState } from 'react';
import TitleBar from './TitleBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = ({ baseUrl }) => {
	const location = useLocation();
	const { userId } = location.state || {};
    const navigate = useNavigate();

	const [shop, setShop] = useState('');
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

    const storeToken = (token) => {
		localStorage.setItem('jwtToken', token);
	};

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

	const handleImageUrlInput = (event) => {
        setImageUrl(event.target.value.trim());
    };

	const handleAddItemButton = async () => {
        if (shop === '' || productName === '' || price === '' || amount === '') {
			setErrorMessage('wypełnij wszystkie wymagane pola formularza');
		} else {
			try {
				setErrorMessage('');
				await axios.post(`${baseUrl}/api/items`, {
					shop: shop,
					productName: productName,
                    price: price,
                    amount: amount,
                    description: description,
                    imageUrl: imageUrl,
                    userId: userId
				});
			} catch (error) {
				setErrorMessage('Wystąpił błąd podczas logowania');
				console.error(error);
			}
		}
    };

	return (
		<div>
			<TitleBar title='Twoje produkty' />
			<div className='vertical-container'>
				<p className='error-message'>{errorMessage}</p>
				<label>
					podaj sklep
					<input type='text' value={shop} onInput={handleShopInput} />
				</label>
				<label>
					podaj nazwę produktu
					<input
						type='text'
						value={productName}
						onInput={handleProductNameInput}
					/>
				</label>
				<label>
					podaj cenę
					<input type='text' value={price} onInput={handlePriceInput} />
				</label>
				<label>
					podaj ilość
					<input type='text' value={amount} onInput={handleAmountInput} />
				</label>
				<label>
					podaj opis (opcjonalnie)
					<input
						type='text'
						value={description}
						onInput={handleDescriptionInput}
					/>
				</label>
				<label>
					podaj url obrazka (opcjonalnie)
					<input type='text' value={imageUrl} onInput={handleImageUrlInput} />
				</label>
				<button onClick={handleAddItemButton}>dodaj produkt</button>
			</div>
		</div>
	);
};

export default AddItem;
