import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid';
import Page from '../Shared/Page';

export default () => (
	<Page name="Settings">
		<WelcomeMessage />
		<CoinGrid topSection />
		<ConfirmButton />
		<CoinGrid />
	</Page>
);
