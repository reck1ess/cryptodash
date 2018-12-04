import React from 'react';
import styled, { css } from 'styled-components';

const Logo = styled.div`
	font-size: 1.5em;
`;

const Bar = styled.div`
	display: grid;
	grid-template-columns: 100px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
	cursor: pointer;
	${props =>
		props.active &&
		css`
			text-shadow: 0px 0px 60px #03ff03;
		`};
`;

const ControlButton = ({ name, active }) => (
	<ControlButtonElem active={active}>{name}</ControlButtonElem>
);

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
