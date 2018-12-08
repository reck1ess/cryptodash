import React, { Component } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');
const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'Dashboard',
			favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
			setPage: this.setPage,
			...this.savedSettings(),
			confirmFavorites: this.confirmFavorites,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			setFilteredCoins: this.setFilteredCoins,
		};
	}

	setPage = page => this.setState({ page });

	setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

	componentDidMount = () => {
		this.fetchCoins();
		this.fetchPrices();
	};

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({ coinList });
	};

	fetchPrices = async () => {
		if (this.state.firstVisit) return;
		let prices = await this.prices();
		this.setState({ prices });
	};

	prices = async () => {
		let result = [];
		for (let i = 0; i < this.state.favorites.length; i++) {
			try {
				let priceData = await cc.priceFull(
					this.state.favorites[i],
					'WON'
				);
				result.push(priceData);
			} catch (e) {
				console.warn('Fetch price error: ', e);
			}
		}
		return result;
	};

	confirmFavorites = () => {
		this.setState(
			{
				firstVisit: false,
				page: 'Dashboard',
			},
			() => {
				this.fetchPrices();
			}
		);
		localStorage.setItem(
			'cryptodash',
			JSON.stringify({
				favorites: this.state.favorites,
			})
		);
	};

	addCoin = key => {
		let favorites = [...this.state.favorites];
		if (favorites.length < MAX_FAVORITES) {
			favorites.push(key);
			this.setState({ favorites });
		}
	};

	removeCoin = key => {
		let favorites = [...this.state.favorites];
		this.setState({ favorites: _.pull(favorites, key) });
	};

	isInFavorites = key => _.includes(this.state.favorites, key);

	savedSettings = () => {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptodash'));
		if (!cryptoDashData) {
			return { page: 'Settings', firstVisit: true };
		}
		let favorites = cryptoDashData;
		return { favorites };
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
