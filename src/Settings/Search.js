import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
	let coinSymbols = Object.keys(coinList);
	let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
	let allStringToSearch = coinSymbols.concat(coinNames);
	let fuzzyResults = fuzzy
		.filter(inputValue, allStringToSearch, {})
		.map(result => result.string);

	let filteredCoins = _.pickBy(coinList, (result, symKey) => {
		let coinName = result.CoinName;
		return (
			_.includes(fuzzyResults, symKey) ||
			_.includes(fuzzyResults, coinName)
		);
	});
	setFilterCoins(filteredCoins);
}, 500);

const filterCoins = (e, setFilteredCoins, coinList) => {
	let inputValue = e.target.value;
	if (!inputValue) {
		setFilteredCoins(null);
		return;
	}
	handleFilter(inputValue, coinList, setFilteredCoins);
};

const SearchInput = styled.input`
	${backgroundColor2};
	${fontSize2};
	border: 1px solid;
	height: 25px;
	color: #1163c9;
	place-self: center left;
`;

const Search = () => (
	<AppContext.Consumer>
		{({ setFilteredCoins, coinList }) => (
			<SearchGrid>
				<h2>Search all coins</h2>
				<SearchInput
					onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
				/>
			</SearchGrid>
		)}
	</AppContext.Consumer>
);
export default Search;
