<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">电话：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row" v-if="isRegOrLogin">
				<text class="title">重复密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row" v-if="isRegOrLogin">
				<text class="title">邮箱：</text>
				<m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register" v-if="isRegOrLogin">注册</button>
			<button type="primary" class="primary" @tap="bindLogin" v-else>登录</button>
		</view>
		<view class="action-row">
			<!-- <navigator url="../reg/reg">注册账号</navigator> -->
			<text @tap='this.isRegOrLogin=true'>注册账号</text>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
		<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				
				<!--  #ifdef  MP-WEIXIN -->
				<button  open-type='getUserInfo' @getuserinfo="getUser">微信登录</button>
				<!--  #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<image :src="provider.image" @tap="oauth(provider.value)"></image> 
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				email: "",
				providerList: [],
				hasProvider: false,
				account: '111111',
				password: '111111',
				positionTop: 0,
				isRegOrLogin: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				// const filters = ['qq', 'sinaweibo'];
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					mobile: this.account,
					pwd: this.password
				};
				this.$axios
					.post("/user/login", {
						mobile: data.mobile,
						pwd: data.pwd
					})
					.then(res => {
						console.log(res);
						// debugger;
						if (res.data.status == 1) {
// 							// this.loading = false;
// 							//   this.totalstars -= stars;
// 							// this.$emit("refreshID", this.form.user_name);
// 							console.log(res.data);
// 
// 							// this.$message({
// 							//   showClose: true,
// 							//   duration: 1500,
// 							//   type: "success",
// 							//   message: res.data && res.data.msg
// 							// });
							var token = "Bearer " + res.data.data.token;
// 
// 							// this.$store.state.token = token;
							this.$store.commit("login_saveToken", token);
// 
// 							// console.log(this.$route.query);
// 							let previousUrl = "/";
// 							// if (this.$route.query && this.$route.query.redirect)
// 							//   previousUrl = this.$route.query.redirect;
// 							// this.$router.push(previousUrl);
// 						} else {
// 							// this.loading = false;
// 							// this.$message({
// 							//   showClose: true,
// 							//   duration: 1500,
// 							//   type: "error",
// 							//   message: res.data && res.data.msg
// 							// });
						}
					})
					.catch(err => {
						// this.loading = false;
						console.log(err);
						// this.$message({
						//   showClose: true,
						//   duration: 1500,
						//   type: "error",
						//   message: err.response.data.msg
						// });
					});
				// const validUser = service.getUsers().some(function (user) {
				//     return data.account === user.account && data.password === user.password;
				// });
				// if (validUser) {
				//     this.toMain(this.account);
				// } else {
				//     uni.showToast({
				//         icon: 'none',
				//         title: '用户账号或密码不正确',
				//     });
				// }
			},
			getUser(res){
				console.log(res.detail.userInfo)
// let info={"nickName":"杨旭","gender":1,"language":"zh_CN","city":"Hohhot","province":"Inner Mongolia","country":"China","avatarUrl":"https://wx.qlogo.cn/xxxx"}
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						console.log(res)
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								console.log(infoRes)
								this.toMain(infoRes.userInfo.nickName);
							},fail:(err)=>{
								console.log(err)
							},compete:(finalsdfk)=>{
								console.log(finalsdfk)
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				}

				const data = {
					mobile: this.account,
					pwd: this.password,
					username: this.email
				}
				service.addUser(data);
				this.$axios
            .post("/user/signup", data)
            .then(res => {
              this.loading = false;
              console.log(res);
              // debugger;
              if (res.data.status == 1 && res.data.msg) {
                //   this.totalstars -= stars;
                // this.$emit("refreshID", this.form.user_name);
                // this.$message({
                //   showClose: true,
                //   duration: 1500,
                //   type: "success",
                //   message: res.data.msg
                // });
                // this.$router.push("/login");
              } else {
                // this.$mymess.error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              // this.$message({
              //   showClose: true,
              //   duration: 1500,
              //   type: "error",
              //   message: "服务器错误 " + err.message
              // });
              // this.loading = false;
            });
				uni.showToast({
					title: '注册成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 300upx;
		height: 100upx;
		/* border: 1upx solid #dddddd;
		border-radius: 100upx; */
		margin: 0 40upx;
		/* background-color: #ffffff; */
	}

	.oauth-image image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}
</style>
