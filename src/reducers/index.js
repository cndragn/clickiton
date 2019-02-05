import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import newReleasesReducer from './newReleasesReducer';
import backdropReducer from './backdropReducer';
import comingSoonReducer from './comingSoonReducer';

export default combineReducers({
	articles: newsReducer,
	newReleases: newReleasesReducer,
	backdrop: backdropReducer,
	comingSoon: comingSoonReducer
});
