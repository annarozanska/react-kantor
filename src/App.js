import React from 'react';
import './App.css';
import CurrencyConvertor from './component/CurrencyConvertor';

function App() {
	return (
		<div>
			<div className='container'>
				<h1>Przelicznik walut</h1>
				<CurrencyConvertor />
			</div>
		</div>
	);
}

export default App;
