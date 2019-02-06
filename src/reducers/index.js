import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import newsReducer from './newsReducer';
import newReleasesReducer from './newReleasesReducer';
import backdropReducer from './backdropReducer';
import comingSoonReducer from './comingSoonReducer';
import movieReducer from './movieReducer';

export default combineReducers({
	searchTerm: searchReducer,
	articles: newsReducer,
	newReleases: newReleasesReducer,
	backdrop: backdropReducer,
	comingSoon: comingSoonReducer,
	movie: movieReducer
});
