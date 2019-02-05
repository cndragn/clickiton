export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_COMING_SOON':
			return action.payload.movies;
		default:
			return state;
	}
};
