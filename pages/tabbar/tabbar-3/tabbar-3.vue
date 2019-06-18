<template>
	<view>
		<uni-grid :options="fruitOptions" @click='clickGrid'>
		</uni-grid>


		<!-- 
		<view class="card card-list2" v-for="item in list.data" @click="goDetail(item)" :key="item.keys">
			<image class="card-img card-list2-img" :src="item.img_src"></image>
			<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
			<view class="card-bottm row">
				<view class="car-title-view row">
					<text class="card-title card-list2-title">{{item.title}}</text>
				</view>
				<view @click.stop="share(item)" class="card-share-view"></view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import uniGrid from '../../../components/uni-grid/uni-grid.vue'
	export default {
		components: {
			uniGrid
		},
		data() {
			return {
				active: false,
				fruitOptions: [{
					image: '../../../static/img/xuncha/huanbao.jpg',
					text: '环保'
				}, {
					image: '../../../static/img/xuncha/shengtai.jpg',
					text: '生态'
				}, {
					image: '../../../static/img/xuncha/huanbao.jpg',
					text: '环保'
				}, {
					image: '../../../static/img/xuncha/shengtai.jpg',
					text: '生态'
				}, {
					image: '../../../static/img/xuncha/huanbao.jpg',
					text: '环保'
				}, {
					image: '../../../static/img/xuncha/shengtai.jpg',
					text: '生态'
				}],
				
			};
		},
		onLoad() {},
		onShow() {
			// setTimeout(() => {
			this.active = true;
			// }, 500);
		},
		onHide() {
			this.active = false;
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			goDetail(item) {
				console.log(item)
			},
			clickGrid(item) {
				console.log(item)
				var name = this.fruitOptions[item.index].text;
				// uni.navigateTo({
				// 	url: 'formInput/formInput?name=' + name
				// });
				uni.navigateTo({
					url:"/pages/tabbar/formInput/formInput?name=" + name
				});
			}
		}
	};
</script>

<style lang="scss">

</style>
