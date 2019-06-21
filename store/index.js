import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		token: "",
		userid: "",
		username: "",
		recordingPolylines:[],
		recordingPoints:[]
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		login_saveToken(state, data) {
			state.token = data;
			uni.setStorageSync("token", data);
			state.hasLogin = true;
			function parseJwt(token) {
				var base64Url = token.split(".")[1];
				var base64 = decodeURIComponent(
					atob(base64Url)
					.split("")
					.map(function(c) {
						return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join("")
				);

				return JSON.parse(base64);
			}
			var dd = parseJwt(data.split(" ")[1]);
			// console.log(dd);
			state.userid = dd.userid;
			state.username = dd.username;
		},
		logout_delToken(state) {
			state.token = "";
			uni.removeStorageSync("token");

			// console.log(dd);
			state.userid = "";
			state.username = "";
		},
		
	}
})

export default store
