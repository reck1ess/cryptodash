import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

const CoinGridStyle = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
	grid-gap: 15px;
	margin-top: 40px;
`;

const getLowerSectionCoins = (coinList, filteredCoins) =>
	(filteredCoins && Object.keys(filteredCoins)) ||
	Object.keys(coinList).slice(0, 100);

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) =>
	topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins);

const CoinGrid = ({ topSection }) => {
	return (
		<AppContext.Consumer>
			{({ coinList, favorites, filteredCoins }) => (
				<CoinGridStyle>
					{getCoinsToDisplay(
						coinList,
						topSection,
						favorites,
						filteredCoins
					).map(coinKey => (
						<CoinTile
							key={coinKey}
							topSection={topSection}
							coinKey={coinKey}
						/>
					))}
				</CoinGridStyle>
			)}
		</AppContext.Consumer>
	);
};

export default CoinGrid;
