import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import newReleasesReducer from './newReleasesReducer';
import backdropReducer from './backdropReducer';

export default combineReducers({
	articles: newsReducer,
	newReleases: newReleasesReducer,
	backdrop: backdropReducer
});
