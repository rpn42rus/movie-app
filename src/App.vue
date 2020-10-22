<template>
	<div id="app">
		<PosterBg :poster="posterBg" />
		<MoviesList :list="moviesList" @changePoster="changePoster" />
		<MoviesPagination />
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "./components/MoviesList";
import PosterBg from "./components/PosterBg";
import MoviesPagination from "./components/MoviesPagination";

export default {
	name: "App",
	components: { MoviesList, PosterBg, MoviesPagination },

	data() {
		return {
			posterBg: "",
		};
	},

	computed: {
		...mapGetters("movies", ["moviesList"]),
	},

	methods: {
		...mapActions("movies", ["fetchMovies"]),

		changePoster(poster) {
			this.posterBg = poster;
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
