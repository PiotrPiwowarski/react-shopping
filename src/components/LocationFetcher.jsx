import React, { useState, useEffect } from 'react';

const LocationFetcher = ({setErrorMessage}) => {
	const [location, setLocation] = useState(null);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
					setErrorMessage('');
				},
				(err) => {
					setErrorMessage(err.message);
				}
			);
		} else {
			setErrorMessage('Geolokalizacja nie jest wspierana w tej przeglądarce.');
		}
	};

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<div className='location'>
            {location !== null ? (<div><p>Twoje współrzędne:</p>
            <p>longitude: {location.longitude}</p>
            <p>latitude: {location.latitude}</p></div>) : 'pobieram lokalizację...'}
        </div>
	);
};

export default LocationFetcher;
