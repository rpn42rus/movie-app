import axios from "@/plugins/axios";

const moviesStore = {
	namespaced: true,
	state: {},
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
