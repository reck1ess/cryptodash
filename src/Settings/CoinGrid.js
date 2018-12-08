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

const getCoinsToDisplay = coinList => Object.keys(coinList).slice(0, 100);

const CoinGrid = () => {
	return (
		<AppContext.Consumer>
			{({ coinList }) => (
				<CoinGridStyle>
					{getCoinsToDisplay(coinList).map(coinKey => (
						<CoinTile key={coinKey} coinKey={coinKey} />
					))}
				</CoinGridStyle>
			)}
		</AppContext.Consumer>
	);
};

export default CoinGrid;
