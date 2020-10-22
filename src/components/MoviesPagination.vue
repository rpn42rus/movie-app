<template>
	<div class="movies-pagination">
		<b-pagination
			v-model="currentPage"
			per-page="perPage"
			:total-rows="total"
			prev-text="prev"
			next-text="next"
		/>
		{{ currentPage }}
	</div>
</template>

<script>
export default {
	name: "MoviesPagination",

	data() {
		return {
			currentPage: 1,
			perPage: 12,
			total: 100,
		};
	},
};
</script>

<style scoped>
.movies-pagination {
	display: flex;
	justify-content: center;
	padding: 20px;
	margin-top: 0 auto;
}

/* /deap/ - для scss */
.movies-pagination >>> .pagination .page-item .page-link {
	background-color: transparent;
	font-size: 12px;
	color: #fff;
	box-shadow: none;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
	color: gray;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
	border-color: #fff;
	background-color: #fff;
	color: #000;
}

.movies-pagination >>> .pagination .page-item.active .page-link:hover {
	background-color: rgb(188, 153, 197);
}
</style>
