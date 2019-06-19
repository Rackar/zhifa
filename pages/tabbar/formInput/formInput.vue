<template>
	<view>
		<view class="">
			{{fruitName}} {{date}}
		</view>
		<!-- <view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					名称：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" focus placeholder="输入巡查名称" />
				</view>
			</view>
			
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					日期：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			
			
		</view> -->
			<form @submit="formSubmit" @reset="formReset">
                <!-- <view class="uni-form-item uni-column">
                    <view class="title">switch</view>
                    <view>
                        <switch name="switch" />
                    </view>
                </view> -->
               <!-- <view class="uni-form-item uni-column">
                    <view class="title">radio</view>
                    <radio-group name="radio">
                        <label>
                            <radio value="radio1" />选项一
                        </label>
                        <label>
                            <radio value="radio2" />选项二
                        </label>
                    </radio-group>
                </view> -->
               <!-- <view class="uni-form-item uni-column">
                    <view class="title">checkbox</view>
                    <checkbox-group name="checkbox">
                        <label>
                            <checkbox value="checkbox1" />选项一
                        </label>
                        <label>
                            <checkbox value="checkbox2" />选项二
                        </label>
                    </checkbox-group>
                </view> -->
               <!-- <view class="uni-form-item uni-column">
                    <view class="title">slider</view>
                    <slider value="50" name="slider" show-value></slider>
                </view> -->
				
                <view class="uni-form-item uni-column">
                    <view class="title">名称：</view>
                    <input class="uni-input" name="name" placeholder="输入本次巡查名称" />
                </view>
				<!-- <view class="uni-list-cell">
					<view class="uni-list-cell-left">
						日期：
					</view>
					<view class="uni-list-cell-db">
						
					</view>
				</view> -->
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						选择方式：
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name" name='type'>
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						人数：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" name='howManypeople' @input="setChanliang" type="digit" placeholder="位" />
					</view>
				</view>
                <view class="uni-btn-v">
                    <button formType="submit">Submit</button>
                    <button type="default" formType="reset">Reset</button>
                </view>
            </form>

	

		<!-- <uni-list>
			<uni-list-item title="上传图片" note="可以上传9张相关图片" @click="routeTo('upload')"></uni-list-item>
			<uni-list-item title="联系方式" note="新建或者选择已有联系方式" @click="routeTo('upload')"></uni-list-item>
		</uni-list>
		
		<view>
			<button type="primary" @tap="getPOS">获取定位</button>
		</view>
		
		<view class="">
			{{pos.long}},{{pos.lat}}
		</view> -->
		<button @click='test'>确定</button>

	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

	function getDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				btnStart:"开始巡查",
				array: [{
					name: '步行'
				}, {
					name: '开车'
				}, {
					name: '其他'
				}],
				index: 0,
				fruitName: "",
				chanliang: 0,
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				time: '12:01',
				location:{},
				pos:{lat:0,long:0}
			};
		},
		onLoad: function(option) {
			this.fruitName = option.name

		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			setChanliang(data) {
				this.chanliang = data.detail.value
			},
			routeTo(type) {
				uni.navigateTo({
					url: "/components/image/image?type=" + type
				});
			},getPOS(){
				uni.getLocation({
					success: (res) => {
						this.location=res
						console.log(res)
						this.pos.lat=this.location.latitude;
						this.pos.long=this.location.longitude;
					}
				})
			},
			test(){
				
				this.$emit('startClicked')
			},
			formSubmit: function(e) {
            console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			var info={userid:null,time:this.date,name:e.detail.value.name,type:this.array[e.detail.value.type],number:parseInt(e.detail.value.howManypeople)}
			this.$emit('startClicked',info)
        },
        formReset: function(e) {
            console.log('清空数据')
            this.chosen = ''
        }
			
		},
	}
</script>

<style lang="scss">

</style>
