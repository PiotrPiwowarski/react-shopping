import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import MenuBar from './MenuBar';
import TitleBar from './TitleBar';
import useStore from './useStore';
import LocationFetcher from './LocationFetcher';

const DisplayItems = () => {
    const baseUrl = useStore(state => state.baseUrl);
    const [user, setUser] = useState('');
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    
    const fetchItems = async (baseUrl) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const userId = localStorage.getItem('userId'); // To może być ciąg znaków
    
            // Pobieranie danych z API, jeśli mamy połączenie z internetem
            if (navigator.onLine) {
                const itemsResponse = await axios.get(`${baseUrl}/api/items/${parseInt(userId)}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                const userResponse = await axios.get(`${baseUrl}/api/users/${parseInt(userId)}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                setItems(itemsResponse.data);
                setUser(userResponse.data);
    
                // Zapisanie odpowiedzi w cache
                const cache = await caches.open('runtime');
                cache.put(`api-items`, new Response(JSON.stringify(itemsResponse.data)));
                cache.put(`api-users`, new Response(JSON.stringify(userResponse.data)));
            } else {
                setErrorMessage('Jesteś offline. Wyświetlam dane z pamięci podręcznej.');
    
                const cache = await caches.open('runtime');
                console.log('pobieranie danych z cache');
                const cachedItemsResponse = await cache.match(`api-items`);
                const cachedUserResponse = await cache.match(`api-users`);
                
                if (cachedItemsResponse && cachedUserResponse) {
                    const cachedItems = await cachedItemsResponse.json(); // Oczekujemy na dane
                    const cachedUser = await cachedUserResponse.json(); // Oczekujemy na dane
                    setItems(cachedItems);
                    setUser(cachedUser);
                } else {
                    setErrorMessage('Brak danych w pamięci podręcznej.');
                }
            }
        } catch (error) {
            console.error('Błąd podczas pobierania danych: ', error);
            setErrorMessage('Pobranie listy produktów się nie powiodło');
        }
    };

    useEffect(() => {
        fetchItems(baseUrl);
    }, [baseUrl]);

    return (
        <div>
            <MenuBar setErrorMessage={setErrorMessage} />
            <TitleBar title='Twoje produkty' />
            <p className='user-greeting'>Cześć {user.email}!</p>
            <LocationFetcher setErrorMessage={setErrorMessage} />
            <div className='vertical-container'>
                <p className='error-message'>{errorMessage}</p>
                {items.map((item) => (
                    <Item key={item.id} item={item} setErrorMessage={setErrorMessage} refreshItems={fetchItems} />
                ))}
            </div>
        </div>
    );
};

export default DisplayItems;

