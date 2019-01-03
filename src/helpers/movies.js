const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

export function fetchFeatured() {
	return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`;
}

export function fetchComingSoon() {
	return `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
}

// list of first 6 movies
export function movieList(num) {
	let movieArr = [];
	Object(this.props.movies).forEach(function(movie, i) {
		if (movie.poster_path !== null && movieArr.length < num) {
			movieArr.push(movie);
		}
	});
	return movieArr;
}

//remove spaces and set to lower for use in url
export function titleLink(link) {
	return link.replace(/\s+/g, '-').toLowerCase();
}

//randomize movies
export function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//format runtime of movie
export function runtime(time) {
	var mm = time % 60;
	var hh = (time - mm) / 60;
	var hhmm = hh.toString() + 'h ' + mm.toString() + 'm';

	return hhmm;
}
