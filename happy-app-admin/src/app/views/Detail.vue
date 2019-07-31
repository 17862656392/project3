<template>
	<div class="page-wrapper">
		<div class="content">
			<div class="banner-content">
				<div class="swiper-container run">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in detail[0].bannerImg.split(',')">
							<img :src="item" />
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
				<div class="remark">
					<span>【{{ detail[0].name }}】</span>
					<span>{{ detail[0].remark }}</span>
					<p>{{ detail[0].b_remark }}</p>
					<div class="price">
						￥<span class="price">{{ detail[0].price }}</span>
						<span class="old-price">￥{{ detail[0].oldPrice }}</span>
					</div>
				</div>
			</div>
			<div class="preferential">
				<div><span>满包邮</span>在线支付满129免运费（部分地区除外）；</div>
				<div><span>买就返</span>订购可获0.19快乐币可抵0.19元</div>
			</div>
			<div class="correct">
				<span><img src="../assets/images/correct_ico.png" >发货&售后</span>
				<span><img src="../assets/images/correct_ico.png" >支付方式</span>
				<span><img src="../assets/images/correct_ico.png" >退货政策</span>
			</div>
			<!-- 评价 -->
			<div class="evaluate">
				<p>
					<span>用户评价（4596）</span>
					<span class="percentage">
					<span>100%</span><span>好评</span>
				</span>
				</p>
				<!-- 用户评价 -->
				<div class="user1">
					<div class="u-left">
						<img src="../assets/images/evaluate/u1.jpg" >
					</div>
					<div class="u-right">
						<p>
							<span>WX_****27e</span>
							<span class="time">2019-05-21</span>
						</p>
						<p class="remark">看照片以为好大，实际上好小啊，9块9买的，写着非卖品。</p>
						<div class="photo"><img :src="detail[0].avatar"/></div>
					</div>
				</div>
				<div class="user">
					<div class="u-left">
						<img src="../assets/images/evaluate/u2.png" >
					</div>
					<div class="u-right">
						<p>
							<span>MB_****a5d</span>
							<span class="time">2019-05-20</span>
						</p>
						<p class="remark">相信快乐购，一次就囤了那么多的货</p>
						<div class="photo"><img src="../assets/images/evaluate/u2_bg.png"></div>
					</div>
				</div>
				<a class="more" href="#">查看更多评价>></a>
			</div>
			<div class="detail">
				<div class="title">
					<span class="active">商品详情</span>
					<span>产品参数</span>
					<span>配送与售后</span>
				</div>
			</div>
		</div>
		<div class="footer">
			<div>
				<router-link to="/">
					<img src="../assets/images/home.png" >
					<p>首页</p>
				</router-link>
				<router-link to="/cart">
					<img src="../assets/images/shop_car_ico.png" >
					<p>购物车</p>
				</router-link>
			</div>
			<div class="cart-content">
				<div class="add-cart" @click="this.addCart">加入购物车</div>
				<div class="buy-cart">立即购买</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Swiper from 'swiper';
        import { createNamespacedHelpers } from 'vuex'
        let { mapState, mapActions } = createNamespacedHelpers('detail');
        export default {
                computed: {
                        ...mapState(['detail']),
                },
                mounted() {
                        this.updateDetail().then(() => {
                                new Swiper ('.run', {
                                        autoplay: true,
                                        loop: true,
                                        // 如果需要分页器
                                        pagination: {
                                                el:'.swiper-pagination',
                                        }
                                });
                        })

                },
	        methods: {
                        ...mapActions(['updateDetail', 'addCart']),

	        },
	        created() {
                        this.updateDetail()
	                        .then(console.log(this.detail))
	        },

        };
</script>

<style scoped>
	.page-wrapper {
		position: relative;
		min-height: 100%;
		font-size: 16px;
		padding-bottom: 50px;
		box-sizing: border-box;
	}
	.content {
	}
	.banner-content .swiper-slide>img {
		width: 100%;
	}
	.banner-content>div.remark {
		padding: 10px;
		box-sizing: border-box;
	}
	.banner-content p {
		color: #c31f3a;
		font-size: 14px;
		line-height: 24px;
	}
	.banner-content div.price {
		margin-bottom: 4px;
		font-size: 14px;
		color: #c31f3a;
	}
	span.price {
		font-size: 24px;
	}

	span.old-price {
		text-decoration: line-through;
		font-size: 14px;
		color: rgb(150,150,150);
	}
	.preferential {
		padding: 10px 10px 20px;
		font-size: 14px;
		border-top: 1px solid rgb(247,247,247);
	}
	.preferential>div {
		padding: 4px 0;
	}
	.preferential span {
		margin-right: 10px;
		padding: 0 4px;
		vertical-align: middle;
		font-size: 12px;
		color: #df0010;
		border: 1px solid #df0010;
		border-radius: 2px;
	}
	.correct {
		padding: 10px;
		background-color: #fafafa;
	}
	.correct>span {
		padding-right: 10px;
		font-size: 12px;
		color: #5a5a5a;
	}
	.correct>span>img {
		width: 13px;
		margin-right: 4px;
	}
	/* 评价 */
	.evaluate {
		font-size: 14px;
		border-top: 10px solid rgb(240,240,240);
	}
	.evaluate>p {
		padding: 0 10px;
		align-items: center;
		display: flex;
		height: 42px;
		color: #1e1e1e;
		border-bottom: 1px solid rgb(247,247,247);
	}
	.evaluate>p>span {
		flex-grow: 1;
	}
	.evaluate>p>span.percentage {
		text-align: right;
	}
	.evaluate>p>span.percentage>span {
		color: #c4223c;
	}
	.evaluate>p>span.percentage>span:nth-child(2) {
		color: #979797;
	}
	.user,.user1 {
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		display: flex;
		border-top: 1px solid rgb(247,247,247);
	}
	.u-left {
		margin-right: 10px;
		flex-shrink: 0;
		width: 35px;
		height: 35px;
	}
	.u-left>img {
		width: 100%;
		border-radius: 50%;
	}
	.u-right {
		flex-grow: 1;
	}
	.u-right>p {
		display: flex;
		color: #979797;
	}
	.u-right>p.remark {
		margin: 10px 0 10px;
		color: #1e1e1e;
	}
	.u-right>p>span {
		flex-grow: 1;
	}
	.u-right>p>span.time {
		text-align: right;
		font-size: 12px;
	}
	.photo>img {
		width: 77px;
	}
	.evaluate>a.more {
		display: block;
		text-align: center;
		height: 46px;
		line-height: 46px;
		color: #c4223c;
		border-bottom: 10px solid rgb(247,247,247);
		border-top: 1px solid rgb(247,247,247);
	}
	/* 详情 */
	.detail {

	}
	.detail>.title {
		box-sizing: border-box;
		background-color: #fff;
		padding: 0 40px;
		display: flex;
		justify-content: space-between;
		color: rgb(150,150,150);
		position: sticky;
		top: 0;
		border-bottom: 1px solid rgb(237,237,237);
		height: 42px;
		line-height: 42px;
	}

	.detail>.title>span {
		box-sizing: border-box;
		border-bottom: 2px solid transparent;
	}
	.detail>.title>span.active {
		height: 100%;
		color: black;
		border-bottom: 2px solid #c4223c;
	}
	.detail-content>ul>li {
		display: none;
	}
	.detail-content>ul>li.active {
		display: block;
	}
	.detail-content>ul>li:nth-child(2) {
	}
	.parameter {
		box-sizing: border-box;
		padding: 0 10px;
		font-size: 15px;
	}
	.parameter>li {
		padding: 10px 0;
		display: flex;
		border-bottom: 1px solid rgb(247,247,247);
	}
	.parameter>li>p {

	}
	.parameter>li>p:nth-child(1) {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		width: 40%;
		color: #787878;
	}
	.parameter>li>p:nth-child(2) {
		flex-grow: 1;
		color: #000;
	}
	.detail-content>ul { font-size: 0; }
	.detail-content>ul>li:nth-child(3) { }
	.detail-content>ul>li:nth-child(3) li { }
	.detail-content>ul>li:nth-child(3) li>img {
		width: 100%;
	}
	.detail-content>ul>li {
		padding: 0 10px;
		background-color: #fff;
	}
	.detail-photo img {
		width: 100%;
	}
	.swiper-pagination-bullet {
		opacity: 1;
		background-color: rgb(216,216,216);
	}
	.swiper-pagination-bullet-active {
		outline: none;
		opacity: 1;
		background-color: #000;
	}


	/* 页脚 */
	.footer {
		z-index: 1000;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		height: 50px;
		background-color: #fff;
	}
	.footer>div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.footer>div>a {
		margin-left: -1px;
		box-sizing: border-box;
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-size: 12px;
		color: rgb(95,95,95);
		border: 1px solid #eee;
	}
	.footer>div>a>img {
		width: 18px;
	}
	.footer>div>a>p {
	}
	.footer>div:nth-child(1) {
		width: 30%;
	}
	.footer>div.cart-content {
		display: flex;
		flex-grow: 1;
		color: #fff;
	}
	.footer>div.cart-content>div {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		height: 100%;
		text-align: center;
	}
	.footer>div.cart-content>div:nth-child(1) {
		background-color: #df2946;
	}
	.footer>div.cart-content>div:nth-child(2) {
		background-color: #c31f3a;
	}
</style>