import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './components/MainPage';

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={MainPage} />
				</Switch>
			</BrowserRouter>
		);
	}
}
