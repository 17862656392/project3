<template>
	<div class="page-wrapper">
		<!--<div class="header">-->
			<!--<span class="address-img"><img src="../assets/images/use-ico.png" alt="" /></span>-->
			<!--<p>请填写收货人信息</p>-->
			<!--<span><img src="../assets/images/gray-arrow.png" alt=""></span>-->
		<!--</div>-->
		<div class="content">

			<ul>
				<li v-for="(item, i) in list" :key="i">
					<div>
						<img :src="item.avatar" alt="" />
					</div>
					<div>
						<p v-text="item.name"></p>
						<p style="color: #c41f3a;padding-top: 10px;">￥{{ item.price }}</p>
						<p style="text-align: right; color: #797979;">x {{ item.count }}</p>
					</div>
				</li>
			</ul>
			<ul class="preferential">
				<li><p>更多优惠</p><p>暂无可用优惠</p></li>
				<li>
					<p>优惠券</p>
					<p style="text-align: left; flex-grow: 1; padding: 0 10px;">可用优惠券0张</p>
					<p style="width: 10px;"><img src="../assets/images/gray-arrow.png" alt=""></p>
				</li>
				<li>
					<p>发票信息</p>
					<p style="text-align: right; flex-grow: 1; padding: 0 10px;">电子发票，个人</p>
					<p style="width: 10px;"><img src="../assets/images/gray-arrow.png" alt=""></p>
				</li>
			</ul>
			<div style="background-color: #fff; padding: 10px; margin-top: 10px;">订单编号：{{ this.list[0].orderId }}</div>
			<div style="background-color: #fff; padding: 10px; margin-top: 10px; color: #666; font-size: 14px;">创建时间：{{ this.list[0].shoppingTime }}</div>
		</div>
		<div class="footer">
			<p style="flex-grow: 1; text-align: right; padding: 0 10px;">实付：<span>￥{{ this.list[0].account }}</span></p>
			<p class="pay" @click="pay">立即支付</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	let { mapState, mapActions } = createNamespacedHelpers('orderDetail');

        export default {
                computed: {
	                ...mapState(['list'])
                },
	        methods: {
		        ...mapActions(['getCartInfo']),
		        pay: function() {
                                let temp = window.location.href.split('/');
                                let orderId = temp[temp.length -1];
				this.$http({
					method: 'post',
					url: 'order/pay',
					data: { id: orderId }
				})
					.then(() => {
                                                alert('支付成功...');
                                                window.location.href = 'app.html#/order';
					})
		        },
	        },
	        created: function(){
		        this.getCartInfo()
			        .then(data => {
			                console.log(data);
			        })
                }
        };
</script>

<style scoped>
	.page-wrapper { display: flex; }
	.page-wrapper>* { background-color: #fff; }
	.header {
		padding: 6px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		flex-shrink: 0;
	}
	.header>span {
		display: flex;
		flex-shrink: 0;
		justify-content: space-between;
		align-items: center;
		width: 10px;
	}
	.header>span.address-img { width: 20px; }
	.header>span>img {
		width: 100%;
	}
	.header>p { text-align: left; flex-grow: 1; padding-left: 10px; color: #797979; }

	.content {
		flex-grow: 1;
		overflow: auto;
		background-color: rgb(238,238,238);
	}
	.content>ul {
		background-color: #fff;
		border-top: 10px solid rgb(238,238,238);
	}
	.content>ul>li {
		padding: 10px;
		display: flex;
		border-bottom: 1px solid #eee;
	}
	.content>ul>li>div {

	}
	.content>ul>li>div:nth-child(1) {
		border: 1px solid #eee;
		flex-shrink: 0;
		width: 90px;
	}
	.content>ul>li>div:nth-child(1)>img { width: 100% }
	.content>ul>li>div:nth-child(2) {
		flex-grow: 1;
		padding-left: 10px;
	}
	.preferential {  }
	.preferential>li {
		display: flex;
		justify-content: space-between;
		align-items:center;
	}
	.preferential img { width: 100%; }
	.footer {
		display: flex;
		line-height: 50px;
		height: 50px;
		flex-shrink: 0;
	}
	.footer>p {
		color: #999;
	}
	.footer>p>span {
		font-size: 18px;
		font-weight: bold;
		color: #c41f3a;
	}
	.footer>p.pay {
		flex-shrink: 0;
		padding: 0 20px;
		color: #fff;
		background-color: #c41f3a;
	}
</style>