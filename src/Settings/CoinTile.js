import React from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisableTile } from '../Shared/Tile';
import CoinImage from '../Shared/CoinImage';
import CoinHeaderGrid from './CoinHeaderGrid';

const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) =>
	topSection ? removeCoin(coinKey) : addCoin(coinKey);

const CoinTile = ({ coinKey, topSection }) => {
	return (
		<AppContext.Consumer>
			{({ coinList, addCoin, removeCoin, isInFavorites }) => {
				let coin = coinList[coinKey];
				let TileClass = topSection
					? DeletableTile
					: isInFavorites(coinKey)
						? DisableTile
						: SelectableTile;

				return (
					<TileClass
						onClick={() =>
							clickCoinHandler(
								topSection,
								coinKey,
								addCoin,
								removeCoin
							)
						}>
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
