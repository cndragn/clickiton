// import _ from 'lodash';
import newsApi from '../apis/news';
import movieApi from '../apis/movies';

const NEWS_KEY = `${process.env.REACT_APP_NEWS_API_KEY}`;
const MOVIE_KEY = `${process.env.REACT_APP_MOVIE_DB_API_KEY}`;

export const fetchNews = () => async (dispatch) => {
	const response = await newsApi.get(`everything?q=movie+film+actor+actress&apiKey=${NEWS_KEY}`);
	dispatch({
		type: 'FETCH_NEWS',
		payload: {
			articles: response.data.articles
		}
	});
};

export const fetchNowPlaying = () => async (dispatch) => {
	const response = await movieApi.get(`movie/now_playing?api_key=${MOVIE_KEY}&language=en-US&page=1&region=US`);
	dispatch({
		type: 'FETCH_NOW_PLAYING',
		payload: {
			movies: response.data.results
		}
	});
};
