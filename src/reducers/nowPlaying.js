export default (state = [], action) => {
	console.log(action.type);
	switch (action.type) {
		case 'FETCH_NOW_PLAYING':
			return action.payload.movies;
		default:
			return state;
	}
};
