import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from '../Shared/Tile';
import CoinImage from '../Shared/CoinImage';
import CoinHeaderGrid from './CoinHeaderGrid';

const CoinTile = ({ coinKey }) => {
	return (
		<AppContext.Consumer>
			{({ coinList }) => {
				let coin = coinList[coinKey];

				return (
					<SelectableTile>
						<CoinHeaderGrid
							name={coin.coinName}
							symbol={coin.Symbol}
						/>
						<CoinImage coin={coin} />
					</SelectableTile>
				);
			}}
		</AppContext.Consumer>
	);
};

export default CoinTile;
