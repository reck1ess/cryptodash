import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = React.createContext();

export class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'Dashboard',
			favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
			timeInterval: 'months',
			setPage: this.setPage,
			...this.savedSettings(),
			confirmFavorites: this.confirmFavorites,
			setCurrentFavorite: this.setCurrentFavorite,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			isInFavorites: this.isInFavorites,
			setFilteredCoins: this.setFilteredCoins,
			changeChartSelect: this.changeChartSelect,
		};
	}

	setPage = page => this.setState({ page });

	setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

	componentDidMount = () => {
		this.fetchCoins();
		this.fetchPrices();
		this.fetchHistorical();
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

	fetchHistorical = async () => {
		if (this.state.firstVisit) return;
		let results = await this.historical();
		let historical = [
			{
				name: this.state.currentFavorite,
				data: results.map((ticker, index) => [
					moment()
						.subtract({
							[this.state.timeInterval]: TIME_UNITS - index,
						})
						.valueOf(),
					ticker.USD,
				]),
			},
		];
		this.setState({ historical });
	};

	historical = () => {
		let promises = [];
		for (let units = TIME_UNITS; units > 0; units--) {
			promises.push(
				cc.priceHistorical(
					this.state.currentFavorite,
					['USD'],
					moment()
						.subtract({ [this.state.timeInterval]: units })
						.toDate()
				)
			);
		}
		return Promise.all(promises);
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
		let currentFavorite = this.state.favorites[0];
		this.setState(
			{
				firstVisit: false,
				page: 'Dashboard',
				currentFavorite,
				prices: null,
			},
			() => {
				this.fetchPrices();
				this.historical();
			}
		);
		localStorage.setItem(
			'cryptodash',
			JSON.stringify({
				favorites: this.state.favorites,
				currentFavorite,
			})
		);
	};

	setCurrentFavorite = sym => {
		this.setState(
			{
				currentFavorite: sym,
				historical: null,
			},
			this.fetchHistorical
		);
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
		let { favorites, currentFavorite } = cryptoDashData;
		return { favorites, currentFavorite };
	};

	changeChartSelect = value => {
		this.setState(
			{ timeInterval: value, historical: null },
			this.fetchHistorical
		);
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
