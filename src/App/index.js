import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import AppLayout from './AppLayout';
import WelcomeMessage from './WelcomeMessage';
import './App.css';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';

class App extends Component {
	render() {
		return (
			<AppLayout>
				<AppProvider>
					<AppBar />
					<WelcomeMessage />
				</AppProvider>
			</AppLayout>
		);
	}
}

export default App;
