import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisableTile } from '../Shared/Tile';
import CoinImage from '../Shared/CoinImage';
import CoinHeaderGrid from './CoinHeaderGrid';

const CoinTile = ({ coinKey, topSection }) => {
	return (
		<AppContext.Consumer>
			{({ coinList }) => {
				let coin = coinList[coinKey];
				let TileClass = topSection ? DeletableTile : SelectableTile;

				return (
					<TileClass>
						<CoinHeaderGrid
							topSection={topSection}
							name={coin.coinName}
							symbol={coin.Symbol}
						/>
						<CoinImage coin={coin} />
					</TileClass>
				);
			}}
		</AppContext.Consumer>
	);
};

export default CoinTile;
