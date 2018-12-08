import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

const CoinGridStyle = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 15px;
	margin-top: 40px;
`;

const getCoinsToDisplay = (coinList, topSection) =>
	Object.keys(coinList).slice(0, topSection ? 10 : 100);

const CoinGrid = ({ topSection }) => {
	return (
		<AppContext.Consumer>
			{({ coinList }) => (
				<CoinGridStyle>
					{getCoinsToDisplay(coinList, topSection).map(coinKey => (
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
