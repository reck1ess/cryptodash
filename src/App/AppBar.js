import React from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from './AppProvider';

const Logo = styled.div`
	font-size: 1.5em;
`;

const Bar = styled.div`
	display: grid;
	grid-template-columns: 100px auto 100px 100px;
	margin-bottom: 40px;
`;

const ControlButtonElem = styled.div`
	cursor: pointer;
	${props =>
		props.active &&
		css`
			text-shadow: 0px 0px 60px #03ff03;
		`};
`;

const toProperCase = lower => lower.charAt(0).toUpperCase() + lower.substr(1);

const ControlButton = ({ name }) => {
	return (
		<AppContext.Consumer>
			{({ page, setPage }) => (
				<ControlButtonElem
					active={page === name}
					onClick={() => setPage(name)}>
					{toProperCase(name)}
				</ControlButtonElem>
			)}
		</AppContext.Consumer>
	);
};

const AppBar = () => {
	return (
		<Bar>
			<div>CryptoDash</div>
			<div />
			<ControlButton active name="Dashboard" />
			<ControlButton name="Settings" />
		</Bar>
	);
};

export default AppBar;
