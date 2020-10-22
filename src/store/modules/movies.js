import axios from "@/plugins/axios";
import movies_id from "@/store/mock/imdb_250";
import mutations from "@/store/mutations";

function serializeResponse(movies) {
	return movies.reduce((acc, movie) => {
		acc[movie.imdbID] = movie;
		return acc;
	}, {});
}

const { MOVIES, CURRENT_PAGE } = mutations;

const moviesStore = {
	namespaced: true,

	state: {
		top250IDs: movies_id, // id фильмов
		moviesPerPage: 12, // количество фильмов на странице
		currentPage: 1, // текущая старница
		movies: {},
	},

	mutations: {
		[MOVIES](state, value) {
			state.movies = value;
		},
		[CURRENT_PAGE](state, value) {
			state.currentPage = value;
		},
	},

	actions: {
		// при инициализации store вызовется метод fetchMovies
		initMoviesStore: {
			handler({ dispatch }) {
				dispatch("fetchMovies");
			},
			root: true,
		},

		// 1) опеределяем интервал фильмов с какого по какой индекс
		// 2) делаем запрос на получение id фильмов по вычисленным индексам
		// 3) переопределяем объект movies
		async fetchMovies({ getters, commit }) {
			try {
				const { currentPage, moviesPerPage, slicedIDs } = getters;
				const from = currentPage * moviesPerPage - moviesPerPage;
				const to = currentPage * moviesPerPage;
				const moviesToFetch = slicedIDs(from, to);
				const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
				const response = await Promise.all(requests);
				const movies = serializeResponse(response);
				commit(MOVIES, movies);
			} catch (error) {
				console.log("error :>> ", error);
			}
		},

		changeCurrentPage({ commit, dispatch }, page) {
			commit("CURRENT_PAGE", page);
			dispatch("fetchMovies");
		},
	},

	getters: {
		slicedIDs: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
		moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
		currentPage: ({ currentPage }) => currentPage,
		moviesList: ({ movies }) => movies,
		moviesLength: ({ top250IDs }) => Number(Object.keys(top250IDs).length),
	},

	modules: {},
};

export default moviesStore;
