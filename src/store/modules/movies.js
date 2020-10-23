import axios from '@/plugins/axios';
import movies_id from '@/store/mock/imdb_250';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
	return movies.reduce((acc, movie) => {
		acc[movie.imdbID] = movie;
		return acc;
	}, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations;

const moviesStore = {
	namespaced: true,

	state: {
		top250IDs: movies_id, // id фильмов
		moviesPerPage: 12, // количество фильмов на странице
		currentPage: 1, // текущая старница
		movies: {},
		isSearch: false,
	},

	mutations: {
		[MOVIES](state, value) {
			state.movies = value;
		},
		[CURRENT_PAGE](state, value) {
			state.currentPage = value;
		},
		[REMOVE_MOVIE](state, index) {
			state.top250IDs.splice(index, 1);
		},
		[TOGGLE_SEARCH](state, bool) {
			state.isSearch = bool;
		},
	},

	actions: {
		// при инициализации store вызовется метод fetchMovies
		initMoviesStore: {
			handler({ dispatch }) {
				dispatch('fetchMovies');
			},
			root: true,
		},

		// 1) опеределяем интервал фильмов с какого по какой индекс
		// 2) делаем запрос на получение id фильмов по вычисленным индексам
		// 3) переопределяем объект movies
		async fetchMovies({ getters, commit, dispatch }) {
			try {
				dispatch('toggleLoader', true, { root: true });
				const { currentPage, moviesPerPage, slicedIDs } = getters;
				const from = currentPage * moviesPerPage - moviesPerPage;
				const to = currentPage * moviesPerPage;
				const moviesToFetch = slicedIDs(from, to);
				const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
				const response = await Promise.all(requests);
				const movies = serializeResponse(response);
				commit(MOVIES, movies);
			} catch (error) {
				console.log('error :>> ', error);
			} finally {
				dispatch('toggleLoader', false, { root: true });
			}
		},

		changeCurrentPage({ commit, dispatch }, page) {
			commit('CURRENT_PAGE', page);
			dispatch('fetchMovies');
		},

		removeMovie({ commit, dispatch, state }, movieId) {
			const index = state.top250IDs.findIndex(item => item === movieId);
			console.log('index :>> ', index);
			if (index !== -1) {
				commit('REMOVE_MOVIE', index);
				dispatch('fetchMovies');
			}
		},

		async searchMovie({ commit, dispatch }, query) {
			try {
				dispatch('toggleLoader', true, { root: true });

				const response = await axios.get(`/?s=${query}`);
				if (response.Error) {
					throw Error(response.Error);
				}

				const movies = serializeResponse(response.Search);
				commit(MOVIES, movies);
			} catch (error) {
				console.log('error :>> ', error);
			} finally {
				dispatch('toggleLoader', false, { root: true });
			}
		},

		toggleSearchState({ commit }, bool) {
			commit('TOGGLE_SEARCH', bool);
		},
	},

	getters: {
		slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
		moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
		currentPage: ({ currentPage }) => currentPage,
		moviesList: ({ movies }) => movies,
		isSearch: ({ isSearch }) => isSearch,
		moviesLength: ({ top250IDs }) => Number(Object.keys(top250IDs).length),
	},
};

export default moviesStore;
