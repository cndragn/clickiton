export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_NEW_RELEASES':
			return `https://image.tmdb.org/t/p/original/${action.payload.movies[0].backdrop_path}`;
		case 'FETCH_MOVIE':
			if (action.payload.movie.backdrop_path === null) return action.movieImg;
			return `https://image.tmdb.org/t/p/w780/${action.payload.movie.backdrop_path}`;
		default:
			return state;
	}
};
