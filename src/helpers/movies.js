const API_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

export function fetchFeatured() {
	return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=US`;
}

export function fetchComingSoon() {
	return `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=US`;
}

export function trendingMovies() {
	return `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
}

//remove spaces and set to lower for use in url
export function tidyLink(link) {
	link = link.replace(/[^\w ]/g, '');
	return link.replace(/\s+/g, '-').toLowerCase();
}

//format runtime of movie
export function runtime(time) {
	var mm = time % 60;
	var hh = (time - mm) / 60;
	var hhmm = hh.toString() + 'h ' + mm.toString() + 'm';

	return hhmm;
}
