<template>
	<div class="page-wrapper">
		<div class="user">
			<img class="logo" src="../assets/images/profile/profile.gif" />
			<span class="user-name">{{ this.name }}</span>
			<img src="../assets/images/profile/member_0.png" />
		</div>
		<!-- 订单 -->
		<div class="order">
			<div>
				<p>我的订单</p>
				<p>查看全部订单<img src="../assets/images/profile/arrow.png" /></p>
			</div>
			<ul>
				<li>
					<img src="../assets/images/profile/order_ico1.png" >
					<p>待付款</p>
				</li>
				<li>
					<img src="../assets/images/profile/order_ico2.png" >
					<p>待收货</p>
				</li>
				<li>
					<img src="../assets/images/profile/order_ico3.png" >
					<p>待评价</p>
				</li>
				<li>
					<img src="../assets/images/profile/order_ico4.png" >
					<p>退货/款</p>
				</li>
			</ul>
		</div>
		<!-- 资产property -->
		<div class="property">
			<div>
				<p>我的资产</p>
			</div>
			<ul>
				<li><p>0</p><p>快乐币</p></li>
				<li><p>7</p><p>优惠券</p></li>
			</ul>
		</div>
		<!--  -->
		<ul class="other">
			<li class="address" @click="toAddress">
				<p><img src="../assets/images/profile/icon_1.png" />收货地址</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_2.png" />我的预售</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_3.png" />我的收藏</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_4.png" />我的足迹</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_5.png" />帮助反馈</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_6.png" />会员权益</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_7.png" />账号设置</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
			<li>
				<p><img src="../assets/images/profile/icon_8.png" />打开APP</p>
				<p><img src="../assets/images/profile/arrow.png" /></p>
			</li>
		</ul>
	</div>
</template>
<script>

        export default {
                data: function() {
                        return {
                                name: []
                        }
                },
		methods: {
		        updateUserName() {
		                this.$http({
                                        method:'post',
                                        url: '/profile/center',
                                })
                                        .then(data =>{
                                                this.name = data;
                                        })
		        },
                        toAddress() {
		                this.$router.push({
			                path: '/add'
		                })
                        }
		},
	        created: function(){
		        this.updateUserName();
                }
        };
</script>
<style scoped>
	.page-wrapper {
		background-color: rgb(238,238,238);
	}
	.page-wrapper>* { background-color: #fff; color: rgb(60,60,60); }
	.page-wrapper>.user {
		padding: 10px 0;
		text-align: center;
		font-size: 18px;
		color: rgb(70,70,70);
	}
	.page-wrapper>.user>* {
		display: block;
	}
	.page-wrapper>.user>img {
		width: 74px;
		margin: 0 auto;
	}
	.page-wrapper>.user>.logo {
		width: 52px;
	}
	.page-wrapper>.user>span {
		padding-bottom: 10px;
	}
	/* 订单 */
	.order { margin: 10px 0; }
	.order>div,.property>div,.other>li {
		display: flex;
		padding: 10px;
		border-bottom: 1px solid rgb(243,243,243);
	}
	.order>div>p {
		flex-grow: 1;
	}
	.order>div>p:nth-child(2) {
		text-align: right;
		color: #969696;
		font-size: 13px;
	}
	.order>div>p>img,.other>li>p:nth-child(2)>img {
		margin-left: 4px;
		width: 7px;
	}
	.order>ul,.property>ul {
		display: flex;
		padding: 14px 0;
		font-size: 14px;
		color: #5a5a5a;
	}
	.order>ul>li,.property>ul>li {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}
	.order>ul>li>img {
		margin-bottom: 4px;
		width: 24px;
	}
	.order>ul>li>p { }
	/* 我的资产 */
	.property>ul>li:nth-child(2) {
		box-sizing: border-box;
		border-left: 1px solid rgb(243,243,243);
	}
	.other {
		margin: 10px 0;
		padding: 0 10px;
	}
	.other>li {
		padding: 10px 0;
	}
	.other>li>p {
		display: flex;
		align-items: center;
	}
	.other>li>p:nth-child(1)>img {
		margin-right: 10px;
	}
	.other>li>p:nth-child(1) {
		flex-grow: 1;
	}
	.other>li>p:nth-child(2) {
		width: 10px;
	}
	.other>li>p>img {
		width: 20px;
	}

</style>