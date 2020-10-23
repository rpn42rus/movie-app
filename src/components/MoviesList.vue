<template>
	<b-container>
		<h3 class="list-title">{{ listTitle }}</h3>
		<b-row>
			<template v-if="isExist">
				<b-col cols="3" v-for="(movie, key) in list" :key="key">
					<MovieItem
						:movie="movie"
						@mouseover.native="onMouseOver(movie.Poster)"
						@removeItem="onRemoveItem"
					/>
				</b-col>
			</template>
			<template v-else>
				<div>
					Empty List
				</div>
			</template>
		</b-row>
	</b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovieItem from './MovieItem';

export default {
	name: 'MoviesList',

	components: {
		MovieItem,
	},

	props: {
		list: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		...mapGetters('movies', ['isSearch']),

		isExist() {
			return Boolean(Object.keys(this.list).length);
		},

		listTitle() {
			return this.isSearch ? 'Search result' : 'IMDB Top 250';
		},
	},

	methods: {
		...mapActions('movies', ['removeMovie']),

		onMouseOver(poster) {
			this.$emit('changePoster', poster);
		},

		async onRemoveItem(data) {
			const isConfirmed = await this.$bvModal.msgBoxConfirm(
				`Are you sure delete ${data.title}?`,
			);
			if (isConfirmed) {
				this.removeMovie(data.id);
			}
		},
	},
};
</script>

<style scoped>
.list-title {
	padding: 40px;
	font-size: 50px;
	color: #fff;
}
</style>
