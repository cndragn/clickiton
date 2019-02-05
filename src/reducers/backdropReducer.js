export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_NEW_RELEASES':
			return `https://image.tmdb.org/t/p/original/${action.payload.movies[0].backdrop_path}`;
		default:
			return state;
	}
};
