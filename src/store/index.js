import Vue from 'vue';
import Vuex from 'vuex';
import movies from './modules/movies';
import notifications from './modules/notifications';
import loader from './modules/loader';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		movies,
		loader,
		notifications,
	},
});

store.dispatch('initMoviesStore');

export default store;
