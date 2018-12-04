import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import WelcomeMessage from './WelcomeMessage';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<WelcomeMessage />
			</div>
		);
	}
}

export default App;
