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
            const userId = localStorage.getItem('userId');

            if (navigator.onLine) {
                // Online: Pobierz dane z API i zapisz w cache
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

                // Zapisz odpowiedzi API w cache
                const cache = await caches.open("shopply-pwa-api-cache");
                cache.put(
                    `${baseUrl}/api/items/${parseInt(userId)}`,
                    new Response(JSON.stringify(itemsResponse.data), {
                        headers: { "Content-Type": "application/json" },
                    })
                );
                cache.put(
                    `${baseUrl}/api/users/${parseInt(userId)}`,
                    new Response(JSON.stringify(userResponse.data), {
                        headers: { "Content-Type": "application/json" },
                    })
                );
            } else {
                // Offline: Pobierz dane z cache
                setErrorMessage('Jesteś offline. Wyświetlam dane z pamięci podręcznej.');
                const cache = await caches.open("shopply-pwa-api-cache");
                const cachedItemsResponse = await cache.match(
                    `${baseUrl}/api/items/${parseInt(userId)}`
                );
                const cachedUserResponse = await cache.match(
                    `${baseUrl}/api/users/${parseInt(userId)}`
                );

                if (cachedItemsResponse && cachedUserResponse) {
                    setItems(await cachedItemsResponse.json());
                    setUser(await cachedUserResponse.json());
                } else {
                    setErrorMessage('Brak danych w pamięci podręcznej.');
                }
            }
        } catch (error) {
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
                {items.map((item) => {
                    return (
                        <Item
                            key={item.id}
                            item={item}
                            setErrorMessage={setErrorMessage}
                            refreshItems={fetchItems}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayItems;

