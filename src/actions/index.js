// import _ from 'lodash';
import newsApi from '../apis/news';

const API_KEY = `${process.env.REACT_APP_NEWS_API_KEY}`;

export const fetchNews = () => async (dispatch) => {
	const response = await newsApi.get(`everything?q=movie+film+actor+actress&apiKey=${API_KEY}`);
	dispatch({ type: 'FETCH_NEWS', payload: response.data.articles });
};
