import React, { Component } from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'dashboard',
			setPage: this.setPage,
			...this.savedSettings(),
			confirmFavorites: this.confirmFavorites,
		};
	}

	setPage = page => this.setState({ page });

	componentDidMount = () => {
		this.fetchCoins();
	};

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({ coinList });
	};

	confirmFavorites = () => {
		this.setState({
			firstVisit: false,
			page: 'dashboard',
		});
		localStorage.setItem(
			'cryptodash',
			JSON.stringify({
				test: 'hello',
			})
		);
	};

	savedSettings = () => {
		let cryptoDashData = JSON.parse(localStorage.getItem('cryptodash'));
		if (!cryptoDashData) {
			return { page: 'settings', firstVisit: true };
		}
		return {};
	};

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
