// import _ from 'lodash';
import newsApi from '../apis/news';
import movieApi from '../apis/movies';

const NEWS_KEY = `${process.env.REACT_APP_NEWS_API_KEY}`;
const MOVIE_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

export const fetchSearch = (term) => async (dispatch) => {
	const response = await movieApi.get(
		`search/movie?api_key=${MOVIE_KEY}&language=en-US&query=${term}&include_adult=false&region=US`
	);
	dispatch({
		type: 'FETCH_SEARCH',
		payload: {
			term: response.data.results
		}
	});
};

export const fetchNews = () => async (dispatch) => {
	const response = await newsApi.get(`everything?q=movie+film+actor+actress&apiKey=${NEWS_KEY}`);
	dispatch({
		type: 'FETCH_NEWS',
		payload: {
			articles: response.data.articles
		}
	});
};

export const fetchNewReleases = () => async (dispatch) => {
	const response = await movieApi.get(`movie/now_playing?api_key=${MOVIE_KEY}&language=en-US&page=1&region=US`);
	dispatch({
		type: 'FETCH_NEW_RELEASES',
		payload: {
			movies: response.data.results,
			background: response.data.results
		}
	});
};

export const fetchComingSoon = () => async (dispatch) => {
	const response = await movieApi.get(`movie/upcoming?api_key=${MOVIE_KEY}&language=en-US&page=1&region=US`);
	dispatch({
		type: 'FETCH_COMING_SOON',
		payload: {
			movies: response.data.results
		}
	});
};

export const fetchMovie = (id, movieImg) => async (dispatch) => {
	const response = await movieApi.get(`movie/${id}?api_key=${MOVIE_KEY}`);
	dispatch({
		type: 'FETCH_MOVIE',
		movieImg,
		payload: {
			movie: response.data,
			background: response.data
		}
	});
};
