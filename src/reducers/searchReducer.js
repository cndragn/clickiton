export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_SEARCH':
			return action.payload.term;
		default:
			return state;
	}
};
