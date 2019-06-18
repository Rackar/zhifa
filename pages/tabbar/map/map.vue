<template>
	<view>
		<!-- <web-view :src="url" @message="getMessage"></web-view> -->
		<!-- 暂时不用外联leaflet地图的方式，测试内置地图组件 -->
		<view class="">
			<button type="primary">开始巡查</button>
			<button type="primary">点位上报</button>
		</view>
		<map class='map' :controls='controls' @controltap='controlTaped'></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://www.codingyang.com/leaflet',
				controls:[{
					id:0,
					position:{
						left:5,
						top:5,
						width:40,
						height:40
					},
					iconPath:"/static/img/start.png",
					clickable:true
				},{
					id:1,
					position:{
						left:55,
						top:5,width:40,
						height:40
					},
					iconPath:"/static/img/record.png",
					clickable:true
				}]
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			},
			controlTaped(control){
				var index = control.detail.controlId
				console.log(this.controls[index])
				// this.controls[index].iconPath="/static/img/qa.png"
			}
		}
	}
</script>

<style>
.map{
	width: 750upx;
	height: 86vh;
}
</style>
