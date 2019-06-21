<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

	var token =  uni.getStorageSync('token');
    if (token) this.$store.commit("login_saveToken", token);
	
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 300);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
		/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
/*每个页面公共css */ 
</style>
