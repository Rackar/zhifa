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
			已巡查任务：{{savedPolylins.length}}
		</view>
		
		 <radio-group @change="radioChange">
                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in savedPolylins" :key="item.id">
                    <view>
                        <radio :value="index"  />
                    </view>
                    <view>第{{index+1}}条路线</view>
                </label>
            </radio-group>
			<view class="">
				
				<button class="mini-btn" type="primary" size="mini">查看</button>
                <button class="mini-btn" type="primary" size="mini">备注</button>
                <button class="mini-btn" type="primary" size="mini">删除</button>
			</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
				},
				currentEdit:0
			};
		},
		computed: {
			
			...mapState(['savedPolylins','record']),
			
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
			if(!this.record.starting)
			this.$store.commit('initMapPolylines')
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
			},
			radioChange(evt){
				this.currentEdit = evt.target.value
				console.log(this.currentEdit)
				// for (let i = 0; i < this.savedPolylins.length; i++) {
    //             if (this.items[i].value === evt.target.value) {
    //                 this.current = evt.target.value;
    //                 break;
    //             }
    //         }
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
	.mini-btn {
		margin-right: 10upx;
		margin-top: 20upx;
	}
</style>
