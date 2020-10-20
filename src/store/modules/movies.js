import axios from "@/plugins/axios";
import movies_id from "@/store/mock/imdb_250";

const moviesStore = {
	namespaced: true,
	state: {
		top250IDs: movies_id,
	},
	mutations: {},
	actions: {
		async fetchMovies(context) {
			console.log("context :>> ", context);
			const response = await axios.get("/", {
				params: {
					i: "tt1285016",
				},
			});
			console.log("response :>> ", response);
		},
	},
	modules: {},
};

export default moviesStore;
