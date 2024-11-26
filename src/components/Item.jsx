const Item = ({ baseUrl, item }) => {
	return (
		<div className='vertical-container item-container'>
			<h3>{item.productName}</h3>
			<p>Sklep: {item.shop}</p>
			<p>Cena: {item.price}</p>
			<p>Ilość produktu: {item.amount}</p>
			<div className='horizontal-container'>
				<button>kup</button>
				<button>usuń</button>
				<button>szczegóły</button>
				<button>edytuj</button>
			</div>
		</div>
	);
};

export default Item;
