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
			setCurrentFavorite: this.setCurrentFavorite,
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
					'USD'
				);
				result.push(priceData);
			} catch (e) {
				console.warn('Fetch price error: ', e);
			}
		}
		return result;
	};

	confirmFavorites = () => {
		let currentFavorites = this.state.favorites[0];
		this.setState(
			{
				firstVisit: false,
				page: 'Dashboard',
				currentFavorites,
			},
			() => {
				this.fetchPrices();
			}
		);
		localStorage.setItem(
			'cryptodash',
			JSON.stringify({
				favorites: this.state.favorites,
				currentFavorites,
			})
		);
	};

	setCurrentFavorite = sym => {
		this.setState({
			currentFavorite: sym,
		});
		localStorage.setItem(
			'cryptodash',
			JSON.stringify({
				...JSON.parse(localStorage.getItem('cryptodash')),
				currentFavorite: sym,
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
		let { favorites, currentFavorites } = cryptoDashData;
		return { favorites, currentFavorites };
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
