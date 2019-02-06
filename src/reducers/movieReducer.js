export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_MOVIE':
			return action.payload.movie;
		default:
			return state;
	}
};
