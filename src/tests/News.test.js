import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import News from '../components/frontpage/News';
import reducers from '../reducers';

const store = createStore(reducers, applyMiddleware(thunk));

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<News />
		</Provider>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
