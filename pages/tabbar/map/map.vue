<template>
	<view>
		<!-- <web-view :src="url" @message="getMessage"></web-view> -->
		<!-- 暂时不用外联leaflet地图的方式，测试内置地图组件 -->
		<view class="">
			<button type="primary" @tap="showDrawerOrStopRecord">{{config.isRecording}}</button>
			<button type="primary" @tap="pickPoints">点位选取</button>
		</view>
		<uni-drawer :visible="config.showDrawer" mode='right' @close="config.showDrawer=false">
			<view style="padding:30upx;">
				<view class="uni-title">输入信息</view>
				<forminput @startClicked="StartRecord"></forminput>
			</view>
		</uni-drawer>
		<map class='map' longitude=111.7 latitude=40.8 scale=10 :controls='controls' @controltap='controlTaped' :polyline="polylines"
		 subkey='PMDBZ-JGEKX-6464E-T76ES-E4TRT-BSFJY'></map>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import forminput from '../formInput/formInput'
	import uniDrawer from '../../../components/uni-drawer/uni-drawer.vue';

	function sendPosToServer() {
		outSet("获取位置信息:");
		var getCoordType = function() {
			var radio = document.getElementsByName("CoordType");
			for (i = 0; i < radio.length; i++) {
				if (radio[i].checked) {
					return radio[i].value;
				}
			}
		}
		var option = {
			geocode: false,
			enableHighAccuracy: true,
			provider: "system",
			coordsType: "wgs84"
		}
		if (getCoordType() == 'wgs84') {
			option.provider = "system"
			option.coordsType = "wgs84"
		} else if (getCoordType() == 'bd09ll') {
			option.provider = "baidu"
			option.coordsType = "bd09ll"


		} else if (getCoordType() == 'gcj02') {
			option.provider = "amap"
			option.coordsType = "gcj02"
		}

		plus.geolocation.getCurrentPosition(getPositionCb, function(e) {
			outSet("获取位置信息失败：" + e.message);
		}, option);
	}

	function getPositionCb(position) {
		console.log(JSON.stringify(position))
		var result = {
			adress: position.addresses,
			time: position.timestamp == null ? new Date() : position.timestamp,
			lat: position.coords.latitude,
			long: position.coords.longitude,
			x: '',
			y: '',
			z: position.coords.altitude,
			heading: position.coords.heading,
			speed: position.coords.speed,
			accuracy: position.coords.accuracy,
			coordsType: position.coordsType
		}
		var myres = {}
		// console.log(result.lat+'jjj'+result.long)
		myres = BLtoXY(parseFloat(result.lat), parseFloat(result.long))
		result.x = myres.x.toFixed(3)
		result.y = myres.y.toFixed(3)
		result.zone = myres.zone

		var json = JSON.stringify(result)
		outSet(JSON.stringify(result))
		outLine(`**********定位结果 东: ${result.x},北:${result.y},第${result.zone}带*************`)
		var url = 'http://123.206.94.184:3000/gps'
		var xhr = null;
		xhr = new plus.net.XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch (xhr.readyState) {
				case 0:
					outLine("xhr请求已初始化");
					break;
				case 1:
					outLine("xhr请求已打开");
					break;
				case 2:
					outLine("xhr请求已发送");
					break;
				case 3:
					outLine("xhr请求已响应");
					break;
				case 4:
					outLine("xhr请求已完成");
					if (xhr.status == 200) {
						outLine("xhr请求成功：" + xhr.responseText);
					} else {
						outLine("xhr请求失败：" + xhr.status);
					}
					break;
				default:
					break;
			}
		}
		xhr.open("POST", url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(json);

	}


	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		components: {
			uniDrawer,
			forminput
		},
		data() {
			return {
				circle: null,
				config: {
					showDrawer: false,
					isRecording: '开始巡查',
					currentPolyline: {
						tripId:null,
						userid: null,
						time: null,
						name: null
					}
				},

				url: 'https://www.codingyang.com/leaflet',
				controls: [{
					id: 0,
					position: {
						left: 5,
						top: 5,
						width: 40,
						height: 40
					},
					iconPath: "/static/img/start.png",
					clickable: true
				}, {
					id: 1,
					position: {
						left: 55,
						top: 5,
						width: 40,
						height: 40
					},
					iconPath: "/static/img/record.png",
					clickable: true
				}],
				polylines: [{
					points: [{
						longitude: 111.7245211,
						latitude: 40.80229
					}, {
						longitude: 111.724520,
						latitude: 40.91229
					}],
					color: "#FF0000DD",
					width: 2
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
			controlTaped(control) {
				//控件在h5和微信小程序的位置不一样
				var that=this
				var index
				if (control.detail.controlId === undefined) {
					index = control.controlId
				} else {
					index = control.detail.controlId
				}
				// var index = control.detail.controlId===undefined || control.controlId 
				console.log(control, this.controls[index])
				// this.controls[index].iconPath="/static/img/qa.png"
				if (index == 0) {
					uni.request({
						// url:'https://www.codingyang.com:3001/gps',
						url: 'http://localhost:3002/gps',
						data: {
							tripId:this.config.currentPolyline.tripId,
							lat: 40,
							long: 111,
						},
						method: "POST",
						success: function(res) {
							console.log(res)
						}
					})
				} else if (index == 1) {
					uni.request({
						// url:'https://www.codingyang.com:3001/gps',
						url: 'http://localhost:3002/trip',
						data: {
							trip: {
								userid: 'String',
								type: 'String',
								tripType: 'String',

							}

						},
						method: "POST",
						success: function(res) {
							console.log(res.data.data.tripId)
							that.config.currentPolyline.tripId=res.data.data.tripId;
						}
					})
				}

			},
			showDrawerOrStopRecord() {
				if (!this.hasLogin) {
					// uni.navigateTo({url:'login'})
					uni.showToast({
						title:'请登录',
						complete:function() {
							uni.switchTab({
								url: '/pages/tabbar/me/me'
							})
						}
					})
					
				} else {
					if (this.config.isRecording == '结束巡查') {
						this.stopGetPosEverySec()
						this.config.isRecording = '开始巡查'
						this.config.showDrawer = false
					} else {

						this.config.showDrawer = true;

					}
				}

			},
			StartRecord() {
				// if (this.isRecording == '结束巡查') {
				// 	this.stopGetPosEverySec()
				// 	this.isRecording = '开始巡查'
				// } else {
				this.getPosEverySec()
				this.config.showDrawer = false;
				this.config.isRecording = '结束巡查'

				// }
			},
			pickPoints() {
				uni.chooseLocation({
					success: this.gotLocation
				});
			},
			getPosEverySec() {
				this.circle = setInterval(this.getPos, 1000);

			},

			stopGetPosEverySec() {
				clearInterval(this.circle);
			},
			getPos() {
				console.log('getpos')
				var that = this
				uni.getLocation({
					type: "gcj02",
					success: that.gotLocation
				})


			},
			gotLocation(pos) {
				console.log('aaaa')
				var p = {
					latitude: pos.latitude,
					longitude: pos.longitude
				}
				var points = this.polylines[0].points
				var lastPoint = points[points.length - 1]
				if (lastPoint.latitude == p.latitude && lastPoint.longitude == p.longitude) {
					console.log('位置未变化')

				} else {
					points.push(p)
					this.polylines = [{
						points: points,
						color: "#FF0000DD",
						width: 2
					}]
				}
			}
		}
	}
</script>

<style>
	.map {
		width: 750upx;
		height: 86vh;
	}
</style>
