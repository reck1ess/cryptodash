import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';

const CoinGridStyle = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 15px;
`;

const CoinGrid = () => {
	return (
		<AppContext.Consumer>
			{({ coinList }) => (
				<CoinGridStyle>
					{Object.keys(coinList).map(coinKey => (
						<SelectableTile>{coinKey}</SelectableTile>
					))}
				</CoinGridStyle>
			)}
		</AppContext.Consumer>
	);
};

export default CoinGrid;
