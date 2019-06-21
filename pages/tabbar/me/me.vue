<template>
	<view>
		<button type="primary" @tap="naviToLogin">登录</button>
		<view class="">
			我的个人信息 {{userid}},{{username}}
		</view>
		<view class="">
			我发布的信息：编辑，删除
		</view>
		<!-- <login v-if="!hasLogin"></login> -->
	</view>
</template>

<script>
	// import login from '../login/login.vue';
		import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin','userid','username'])
		},
		components:{
			// login
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onShow() {
			
			// if (!this.hasLogin) {
			// 	uni.showToast({
			// 		title:'请登录',
			// 		duration:500
			// 		
			// 	})
			// 	
			// }
		},
		methods: {
			naviToLogin(){
				uni.navigateTo({
					url: '/pages/tabbar/login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			}

		}
	}
</script>

<style>
	
</style>
