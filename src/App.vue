<template>
	<div id="app">
		<MoviesList :list="moviesList" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "./components/MoviesList";

export default {
	name: "App",
	components: { MoviesList },

	computed: {
		...mapGetters("movies", ["moviesList"]),
	},

	methods: {
		...mapActions("movies", ["fetchMovies"]),
	},
};
</script>

<style lang="scss">
#app {
	font-family: Arial, Helvetica, Arial, sans-serif;
}
</style>
