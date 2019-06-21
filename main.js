import Vue from 'vue'
import App from './App'

import store from './store'

import {
	http
} from './js_sdk/luch-request/index.js'
http.setConfig((config) => { /* config 为默认全局配置*/
	// config.baseUrl = 'http://localhost:3002'; /* 根域名 */
	config.baseUrl='https://www.codingyang.com:3001'
	config.header = {
		'Content-Type': 'application/json;charset=UTF-8'

	};

	return config
})
http.interceptor.request((config, cancel) => { /* cancel 为函数，如果调用会取消本次请求。需要注意：调用cancel,本次请求的catch仍会执行。必须return config */
	console.log(config)
	config.header = {
		a: 1,
		...config.header
	}
	if (store.state.token) {
		config.header.Authorization = `${store.state.token}`;
	}
	return config;
})
http.interceptor.response((response) => { /* 必须return response*/
	if (response.data.status === 0) {
		// localStorage.clear();
		uni.clearStorage()
		console.log('token不存在，需要重新登录')
		// router.replace({
		//   path: "/login",
		//   query: {
		//     redirect: router.currentRoute.fullPath
		//   }
		// });
		// ElementUI.Message({
		//   showClose: true,
		//   duration: 1000,
		//   type: "error",
		//   message: "请登录后操作"
		// });
	}
	return response;
})

Vue.prototype.$axios = http;

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
