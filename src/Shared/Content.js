import React from 'react';
import styled from 'styled-components';

import { AppContext } from '../App/AppProvider';

const Content = props => (
	<AppContext.Consumer>
		{({ coinList, prices, firstVisit }) => {
			if (!coinList) return <Spinner />;
			if (!firstVisit && !prices) return <Spinner />;
			return <div>{props.children}</div>;
		}}
	</AppContext.Consumer>
);

const Spinner = () => (
	<Wrapper>
		<StyledSpinner viewBox="0 0 50 50">
			<circle
				className="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="4"
			/>
		</StyledSpinner>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const StyledSpinner = styled.svg`
	animation: rotate 2s linear infinite;
	margin: -25px 0 0 -25px;
	width: 50px;
	height: 50px;

	& .path {
		stroke: white;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

export default Content;
