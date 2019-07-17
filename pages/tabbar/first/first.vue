<template>
	<view class="main">
		<view class="content">
			通用巡查监管APP
		</view>
		

		<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dotsStyles='dotStyle'>
			<swiper class="swiper-box" @change="change" autoplay="true">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<view class="swiper-item">
						<!-- {{item.content}} -->
						<image :src="item.url" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="time">
			{{thisTime}}
			
		</view>
		<view class="">
			待巡查任务：0
		</view>
		<view class="">
			已巡查任务：0
		</view>
	</view>
</template>

<script>
	import 		uniSwiperDot	 from '../../../components/uni-swiper-dot/uni-swiper-dot.vue';
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
				date: new Date(),
				title: 'Hello',
				info: [{
					content: '自然资源',
					url:"/static/img/xuncha/ziran.jpg"
				}, {
					content: '生态环境',
					url:"/static/img/xuncha/shengtai.jpg"
				}, {
					content: '执法',
					url:"/static/img/xuncha/zhifa.jpg"
				}],
				current: 0,
				mode: 'nav',
				dotStyle:{
					// color:"#fff",
					// backgroundColor:"#777",
					// selectedBackgroundColor:"#f40"
				}
			};
		},
		computed: {
			thisTime() {
			var today = this.date;  
			// console.log('time comput')
			  return today.toISOString().substring(0,10)+ ' '+today.toTimeString().substring(0,9);
			}
		},
		onLoad() {
			 let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
			this.timer = setInterval(() => {
			  _this.date = new Date(); // 修改数据date
			}, 1000)
		},
		onShow(){
			 let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
			 _this.date = new Date();
			 if(!this.timer){
				 this.timer = setInterval(() => {
				   _this.date = new Date(); // 修改数据date
				 }, 1000)
			 }
			
		},
		onHide(){
			if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
	  this.timer=null;
    }
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		/* height: 400upx; */
		margin-top: 60upx;
		margin-bottom: 60upx;
		font-size: 60upx;
	}
	.main{
		text-align: center;
	}
	.time{
		font-size:40upx;
	}
</style>
