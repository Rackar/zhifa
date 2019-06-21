import Request from './request'
const test = new Request();
test.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.aaa.cn';
	config.header = {
		a: 1,
		b: 2
	}
	return config
})
test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		a: 1,
		...config.header
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
test.interceptor.response((response) => { /* 请求之后拦截器 */
	return response;
})

const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.bbb.cn'; /* 根域名不同 */
	config.header = {
		a: 1,
		b: 2
	}
	return config
})
http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		a: 1,
		...config.header
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
		cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response);
	return response;
})
export {
	http,
	test
};


