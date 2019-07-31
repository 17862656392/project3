<template>
	<div class="page-wrapper">
		<div class="header">
			<p>购物车</p>
			<p class="btn-edit" @click="isEdit = !isEdit" v-text="isEdit ? '完成' : '编辑'"></p>
		</div>
		<div class="content">
			<ul class="cart-list" v-if="list.length > 0">
				<li v-for="item in list" :key="item.id">
					<span class="checkbox" :class="{ checked: item.active1 }" v-show="!isEdit" @click="item.active1 = !item.active1"></span>
					<span class="checkbox" :class="{ checked: item.active2 }" v-show="isEdit" @click="item.active2 = !item.active2"></span>
					<router-link :to="`/detail/${ item.pid }`" class="avatar-wrapper">
						<img :src="item.avatar" alt="">
					</router-link>
					<div class="info">
						<router-link :to="`/detail/${ item.pid }`" class="name" v-text="item.name"></router-link> <br />
						<router-link :to="`/detail/${ item.pid }`" class="price-wrapper">￥<span class="price" v-text="item.price"> </span>
						</router-link>
						<div class="count-wrapper">
							<span></span>
							<NumCount :count="item.count"
							          @increase="increase(item)"
							          @decrease="decrease(item)">
							</NumCount>
						</div>
					</div>
				</li>
			</ul>
			<div v-else style="padding-top: 20%;">
				<p style="display: flex; justify-content: center; align-items: center"><img src="../assets/images/icon_cart.png" alt="" style="width: 200px;"/></p>
				<p style="margin-top: 20px; text-align: center;">购物车肚子空空的，可能心情不太好</p>
			</div>
		</div>
		<footer class="footer-normal" v-show="!isEdit">
			<div class="all-wrapper">
				<span class="checkbox all" :class="{ checked: active1 }" @click="changeAll1(active1)"></span>&nbsp;全选
			</div>
			<div class="total-price-wrapper">
				合计：<em>￥<span class="total-price" v-text="totalPrice"></span></em>
			</div>
			<button class="btn-settlement" @click="settlement">结&nbsp;算&nbsp;<span class="total-count" v-text="totalCount > 0 ? `(${ totalCount })` : ''"></span></button>
		</footer>
		<footer class="footer-edit" v-show="isEdit">
			<div class="all-wrapper">
				<span class="checkbox all" :class="{ checked: active2 }" @click="changeAll2(active2)"></span> 全选
			</div>
			<button class="btn-remove" @click="remove">删&nbsp;&nbsp;除</button>
		</footer>
	</div>
</template>
<script>
        import NumCount from '../components/NumCount.vue';

        export default {
                components: { NumCount },
                data: function(){
                        return {
                                isEdit: false, //是否编辑
                                list: [],
	                        orderId: ''
                        };
                },
                computed: {
                        active1: function(){
                                return !this.list.find(item => item.active1 === false)
                        },
                        active2: function(){
                                return !this.list.find(item => item.active2 === false)
                        },
                        totalPrice: function(){
                                var result = 0;
                                this.list.filter(item =>item.active1).forEach(item => result += item.count * item.price);
                                return result;
                        },
                        totalCount: function(){
                                var result = 0;
                                this.list.filter(item => item.active1).forEach(item => result += item.count);
                                return result;
                        }
                },
                created: function(){
                        this._getCartData();
                },
                methods: {
                        _getCartData: function(){
                                this.$http({
                                        method: 'post',
                                        url: '/cart/list'
                                }).then(data => {
                                        data.forEach(item => {
                                                item.active1 = true;
                                                item.active2 = false;
                                        });
                                        this.list = data;
                                })
                        },
                        changeAll1: function(flag){
                                this.list.forEach(item => item.active1 = !flag);
                        },
                        changeAll2: function(flag){
                                this.list.forEach(item => item.active2 = !flag);
                        },
                        decrease: function(item){
                                if(item.count === 1) {
                                        alert('商品数量已达下限');
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/cart/decrease',
                                        data: { id: item.id },
                                }).then(data => item.count -= 1);
                        },
                        increase: function(item){
                                if(item.count === 5) {
                                        alert('商品数量已达上限');
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/cart/increase',
                                        data: { id: item.id },
                                }).then(data => item.count += 1);
                        },
                        remove: function(){
                                let activeList = this.list.filter(item => item.active2);
                                if(activeList.length < 1) {
                                        alert('请选择要删除的商品..');
                                        return;
                                }
                                if(!confirm('确认删除所选商品？')) return;
                                let ids = [];
                                activeList.forEach(item => ids.push(item.id));

                                this.$http({
                                        method: 'post',
                                        url: '/cart/remove',
                                        data: { ids: JSON.stringify(ids) }
                                }).then(data => {
                                        ids.forEach(item => {
                                                for(let i = 0; i < this.list.length; i++) {
                                                        if(this.list[i].id === item) {
                                                                this.list.splice(i, 1);
                                                                break;
                                                        }
                                                }
                                        })
                                });
                        },
                        settlement: function(){
                                let activeList = this.list.filter(item => item.active1);
                                if(activeList.length < 1) {
                                        alert('请先选择');
                                        return;
                                }
                                let ids = [];
                                activeList.forEach(item => ids.push(item.id));
                                this.$http({
                                        method: 'post',
                                        url: '/cart/settlement',
                                        data: {
                                                ids: JSON.stringify(ids),
                                                account: this.totalPrice
                                        }
                                }).then(data => {
                                        ids.forEach(item => {
                                                for(let i = 0; i < this.list.length; i++) {
                                                        if(this.list[i].id === item) {
                                                                this.list.splice(i, 1);
                                                                break;
                                                        }
                                                }
                                        });
                                        alert('进入订单详情页面...');
                                        this.orderId = data[0][0].orderId;
                                        this.$router.push({
	                                        path:`/orderdetail/${ this.orderId }`
                                        });
                                })
                        }
                }

        };
</script>
<style scoped>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		color: rgb(30,30,30);
	}
	.header {
		position: relative;
		flex-shrink: 0;
		text-align: center;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid rgb(244,244,244);
	}
	.header>.btn-edit {
		position: absolute;
		top: 0;
		right: 10px;
		color: #787878;
	}
	.content {
		overflow: auto;
		flex: 1;
	}
	.content>ul.cart-list>li {
		display: flex;
		align-items: center;
		height: 120px;
		background-color: #fef8f4;
	}
	.content>ul.cart-list>li>a {
		display: block;
		width: 90px;
		height: 90px;
	}
	.content>ul.cart-list img { width: 100%; }
	span.checkbox {
		box-sizing: border-box;
		margin: 0 10px;
		display: inline-block;
		width: 18px;
		height: 18px;
		background-image: url(../assets/images/radio.png);
		background-size: 100% 100%;
	}
	span.checkbox.checked {
		background-image: url(../assets/images/radio_on.png);
	}
	.info {
		flex-grow: 1;
		padding: 0 20px;
	}
	.info a {
		color: #333;
	}
	.price-wrapper {
		font-weight: bold;
	}
	.count-wrapper {
		display: flex;
		justify-content: space-between;
	}
	footer {
		display: flex;
		flex-shrink: 0;
		bottom: 0;
		height: 55px;
		border-top: 1px solid rgb(244,244,244);
	}
	.footer-edit {
		justify-content: space-between;
	}
	.btn-remove {
		font-size: 16px;
		border: none;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		background-color: #df0010;
	}
	.all-wrapper {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 100px;
	}
	.total-price-wrapper {
		box-sizing: border-box;
		padding-right: 10px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-grow: 1;
	}
	.total-price-wrapper span {
		font-weight: bold;
		color: #df0010;
	}
	.btn-settlement {
		font-size: 16px;
		border: none;
		box-sizing: border-box;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 100px;
		color: #fff;
		background-color: #df0010;
	}
</style>