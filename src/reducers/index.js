import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import nowPlayingReducer from './nowPlaying';

export default combineReducers({
	articles: newsReducer,
	nowPlaying: nowPlayingReducer
});
