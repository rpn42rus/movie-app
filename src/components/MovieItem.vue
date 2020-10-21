<template>
	<div class="movie-item mb-3">
		<div class="movie-item-poster" :style="posterBg"></div>
	</div>
</template>

<script>
export default {
	name: "MovieItem",

	props: {
		movie: {
			type: Object,
			required: true,
			default: () => ({}),
		},
	},

	computed: {
		posterBg() {
			return {
				"background-image": `url(${this.movie.Poster})`,
			};
		},
	},
};
</script>

<style scoped>
.movie-item {
	position: relative;
	cursor: pointer;
	overflow: hidden;
	border-radius: 5px;
	transition: all 0.2s ease-in;
	height: 300px;
}

.movie-item-poster {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-repeat: no-repeat;
}
</style>
