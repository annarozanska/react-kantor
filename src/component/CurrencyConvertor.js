import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://api.nbp.pl/api/exchangerates/rates/a/';

const CurrencyConvertor = () => {
	const [initialState, setInitialState] = useState({
		currencyValue: ['EUR', 'USD', 'CHF'],
		amount: '',
		base: 'EUR',
		converTo: 'PLN',
		result: '',
	});

	const { converTo, currencyValue, result, amount, base } = initialState;

	useEffect(() => {
		axios
			.get(URL + `${base}`)
			.then((res) => {
				const result = (res.data.rates[0].mid * amount).toFixed(2);

				setInitialState({
					...initialState,
					result: result,
				});
			})
			.catch(() =>
				alert(
					'Niestety w tej chwili nie udało nam się pobrać kursu wybranej waluty, spróbuj jeszcze raz.'
				)
			);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [base, amount]);

	const handleInput = (e) => {
		setInitialState({
			...initialState,
			amount: e.target.value,
			result: null,
		});
	};

	const handleSelect = (e) => {
		setInitialState({
			...initialState,
			[e.target.name]: e.target.value,
			result: null,
		});
	};

	return (
		<div>
			<input
				type='number'
				className='currency'
				value={amount}
				onChange={handleInput}
			/>
			<select name='base' value={base} onChange={handleSelect}>
				{currencyValue.map((current) => (
					<option key={current} value={current}>
						{current}
					</option>
				))}
			</select>
			<h2>to:</h2>
			<input
				className='currency'
				value={
					amount === '' || amount <= 0
						? '0'
						: result === null
						? 'Obliczam...'
						: result
				}
			/>
			{converTo}
		</div>
	);
};

export default CurrencyConvertor;
