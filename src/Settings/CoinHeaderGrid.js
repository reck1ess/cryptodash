import React from 'react';
import styled from 'styled-components';
import { DeletableTile } from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
	justify-self: right;
`;

const DeleteIcon = styled.div`
	justify-self: right;
	visibility: hidden;
	${DeletableTile}:hover & {
		visibility: visible;
		color: red;
	}
`;

const CoinHeaderGrid = ({ name, symbol, topSection }) => {
	return (
		<CoinHeaderGridStyled>
			<div>{name}</div>
			{topSection ? (
				<DeleteIcon>x</DeleteIcon>
			) : (
				<CoinSymbol>{symbol}</CoinSymbol>
			)}
		</CoinHeaderGridStyled>
	);
};

export default CoinHeaderGrid;
