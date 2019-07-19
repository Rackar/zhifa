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
		savedPolylins: [],
		recordingPolyline: {},
		recordingPoints: [],
		recordRepeatHandle: {},
		record: {
			starting: false,
			name: "",
			type: "",
			time: '',
			number: 0,
			userid: ''
		}
	},
	actions: {
		async startLoop({
			commit,
			state,

		}) {
			state.record.starting = true;
			state.recordRepeatHandle = setInterval(() => {
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						var isSamePoint = false
						if (state.recordingPoints.length == 0) {} else {
							isSamePoint = (res.latitude == state.recordingPoints[state.recordingPoints.length - 1].latitude && res.longitude ==
								state.recordingPoints[state.recordingPoints.length - 1].longitude)
						}
						if (!isSamePoint)
							commit('gotPositionResult', res)
					}
				})


				// commit('increment')
			}, 1000)
		},
		endLoop({

			state
		}) {
			state.record.starting = false;
			state.recordingPolyline = {
				points: state.recordingPoints,
				color: "#FF0000DD",
				width: 3
			}
			
			console.log(state)
			clearInterval(state.recordRepeatHandle);
			state.savedPolylins.push(state.recordingPolyline);
			uni.setStorage({
				key: 'savedPolylins',
				data: state.savedPolylins,
				success: function() {
					console.log('save polylins success');
					state.recordingPoints=[];
				}
			});

		}
	},
	mutations: {
		initMapPolylines(state) {
			uni.getStorage({
				key: 'savedPolylins',
				success: function(res) {
					console.log(res.data);
					if(res.data&&res.data.length){
						state.savedPolylins=res.data
						state.recordingPolyline=res.data[0]
					}
				}
			});
		},
		startRecord(state, data) {
			state.record = { ...data,
				starting: true
			};

		},
		gotPositionResult(state, pos) {
			console.log(pos)
			state.recordingPoints.push(pos)
			state.recordingPolyline = {
				points: state.recordingPoints,
				color: "#FF0000DD",
				width: 3
			}
		},
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
