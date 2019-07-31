<template>
	<ul class="footer">
		<li><router-link to="/" exact><img src="../assets/images/footer/home.png" /><span>首页</span></router-link></li>
		<li><router-link to="/category"><img src="../assets/images/footer/category.png" /><span>分类</span></router-link></li>
		<li><router-link to="/video"><img class="video" src="../assets/images/footer/video.png" /><span>直播表</span></router-link></li>
		<li><router-link to="/cart"><img src="../assets/images/footer/cart.png" /><span>购物车</span></router-link></li>
		<li><router-link to="/profile"><img src="../assets/images/footer/person.png" /><span>我的</span></router-link></li>
	</ul>
</template>
<script>
	export default {};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.footer
		display: flex
		height: 50px
		border: 1px solid #eee
		li
			flex-grow: 1
			display: flex
			a
				display: flex
				width: 100%
				height: 100%
				flex-direction: column
				align-items: center
				justify-content: center
				flex-grow: 1
				font-size: 12px
				color: #969696
				img
					width: 22px
				.video
					width: 40px
</style>