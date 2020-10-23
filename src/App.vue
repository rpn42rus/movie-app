<template>
	<div id="app">
		<Loader />
		<PosterBg :poster="posterBg" />
		<Header />
		<MoviesList :list="moviesList" @changePoster="changePoster" />
		<MoviesPagination
			:current-page="currentPage"
			:per-page="moviesPerPage"
			:total="moviesLength"
			@pageChanged="onPageChanged"
		/>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from './components/MoviesList';
import PosterBg from './components/PosterBg';
import MoviesPagination from './components/MoviesPagination';
import Loader from './components/Loader';
import Header from './components/Header';

export default {
	name: 'App',
	components: { MoviesList, PosterBg, MoviesPagination, Loader, Header },

	data() {
		return {
			posterBg: '',
		};
	},

	computed: {
		...mapGetters('movies', ['moviesList', 'currentPage', 'moviesPerPage', 'moviesLength']),
	},

	methods: {
		...mapActions('movies', ['changeCurrentPage']),

		changePoster(poster) {
			this.posterBg = poster;
		},

		onPageChanged(page) {
			this.$router.push({ query: { page } });
		},

		onPageQueryChange({ page = 1 } = {}) {
			this.changeCurrentPage(Number(page));
		},
	},

	watch: {
		'$route.query': {
			handler: 'onPageQueryChange',
			immediate: true,
			deep: true,
		},
	},
};
</script>

<style lang="scss">
#app {
	font-family: Arial, Helvetica, Arial, sans-serif;
	position: relative;
}
</style>
