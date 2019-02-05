export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_NEW_RELEASES':
			return action.payload.movies;
		default:
			return state;
	}
};
