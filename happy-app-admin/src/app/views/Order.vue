<template>
	<div class="page-wrapper">
		<div class="order">
			<ul class="header">
				<li><span class="active">商城</span></li>
				<li><span>待付款</span></li>
				<li><span>待收货</span></li>
				<li><span>待评价</span></li>
				<li><span>退货/款</span></li>
			</ul>
			<ul class="order-content">
				<!--<li v-for="(item, i) in list" :key="i">-->
					<!--<div>-->
						<!--<p>{{item.shoppingTime}}</p>-->
						<!--<p>待付款</p>-->
					<!--</div>-->
					<!--<div>-->
						<!--<div class="wrapper">-->
							<!--<p class="avatar"><img :src="item.avatar" alt="" /></p>-->
							<!--<div class="remark">-->
								<!--<p>{{ item.name }}</p>-->
								<!--<p>-->
									<!--<span>×{{item.count}}</span>-->
									<!--<span>￥{{ item.price }}</span>-->
								<!--</p>-->
							<!--</div>-->
						<!--</div>-->
					<!--</div>-->
					<!--<div>-->
						<!--<p>共计{{item.count}}件商品</p>-->
					<!--</div>-->
					<!--<div>-->
						<!--<p class="num">订单编号：{{ item.orderId }}</p>-->
					<!--</div>-->
					<!--<div>-->
						<!--<p></p>-->
						<!--<p class="pay">立即支付</p>-->
					<!--</div>-->
				<!--</li>-->
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	let { mapState, mapActions } = createNamespacedHelpers('order');

        export default {
	        computed: {
		        ...mapState(['list']),
	        },
                methods: {
	                ...mapActions(['getOrder']),
                },
                created:function(){
                        this.getOrder();
                }
        };
</script>
<style scoped>
	.page-wrapper { background-color: rgb(238,238,238); }
	.header {
		margin-bottom: 10px;
		display: flex;
		background-color: #fff;
		height: 42px;
		line-height: 42px;
	}
	.header>li {
		display: flex;
		flex-grow: 1;
		justify-content: center;
	}
	.header span.active {
		color: rgb(196,31,58);
		border-bottom: 2px solid rgb(196,31,58);
	}
	ul.order-content {
	}
	ul.order-content>li { background-color: #fff; }
	ul.order-content>li>div {
	}
	ul.order-content>li>div:nth-child(1) {
		padding: 10px;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
	}
	ul.order-content>li>div:nth-child(2) {
		padding: 10px;
	}
	ul.order-content>li>div:nth-child(2)>.wrapper {
		padding: 10px;
		display: flex;
		border-bottom: 1px solid #eee;
	}
	ul.order-content>li>div:nth-child(2) p.avatar {
		width: 80px;
		flex-shrink: 0;
		border: 1px solid #eee;
		margin-right: 10px;
	}
	ul.order-content>li>div:nth-child(2) p.avatar>img {
		width: 100%;
	}
	ul.order-content>li>div:nth-child(3) {
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	ul.order-content>li>div:nth-child(4) {
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	ul.order-content>li>div:nth-child(5) {
		padding: 10px;
		display: flex;
		justify-content: space-between;
	}
	.remark {
		flex-grow: 1;
	}
	.remark>p:nth-child(2) {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		color: #787878
	}
	.pay {
		padding: 5px 10px;
		flex-shrink: 0;
		color: rgb(196,31,58);
		border-radius: 5px;
		border: 1px solid rgb(196,31,58);
	}
	.num {
		color: #787878;
		font-size: 14px;
	}
</style>