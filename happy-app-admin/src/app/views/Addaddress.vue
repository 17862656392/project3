<template>
	<div class="page-wrapper">
		<div class="add" @click="toAddress">新 增</div>
		<ul>
			<li v-for="item in list" :key="item.id">
				<div>
					<p><span class="receive-name" v-text="item.receiveName"></span><span class="tel" v-text="item.receiveTel"></span></p>
					<p class="address" v-text="item.receiveAddress"></p>
				</div>
				<div>
					<p class="default-address">
						<img class="default active" src="../assets/images/car1no.png" /><img class="default default-y" src="../assets/images/car11.png" />默认地址
					</p>
					<p>
						<span class="edit"><img src="../assets/images/ico_bj.png" />编辑</span>
						<span class="remove"><img src="../assets/images/car_del.png" @click="removeAddress(item.id)" />删除</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data(){
                        return{
                                list: []
                        }
                },
                methods: {
                        toAddress() {
                                this.$router.push({
                                        path: '/address'
                                })
                        },
	                addressList() {
                                this.$http({
	                                method: 'post',
                                        url: '/address/list',
                                })
	                                .then(data => this.list = data);
	                },
	                removeAddress(id) {
                                this.$http({
	                                method: 'post',
                                        url: '/address/remove',
	                                data: {
	                                        id: id
	                                }
                                })
	                                .then(() => {
                                                alert('删除成功');
		                                window.location.reload();
	                                });
	                }
                },
	        created() {
                        this.addressList();
	        }
        };
</script>

<style scoped>
	.add {
		margin: 10px;
		align-self: center;
		width: 95%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		background-color: #94193f;
		color: #fff;
		border-radius: 6px;
	}
	ul>li {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		box-sizing: border-box;
		padding: 0 10px;
		height: 100px;
		background-color: #fff;
	}
	ul>li>div {
		box-sizing: border-box;
		padding: 10px 0;
	}
	ul>li>div:nth-child(1) {
		flex-grow: 1;
		border-bottom: 1px solid rgb(248,248,248);
	}
	ul>li>div:nth-child(2) {
		display: flex;
		justify-content: space-between;
		height: 40px;
	}
	ul>li>div:nth-child(2)>p {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	ul>li>div:nth-child(2)>p img {
		margin-right: 4px;
	}
	ul>li>div:nth-child(2)>p:nth-child(2) {
		color: rgb(153,153,153);
	}
	ul>li>div:nth-child(2)>p:nth-child(2)>span:nth-child(1) {
		margin-right: 20px;
	}
	ul>li>div:nth-child(2)>p:nth-child(2) img {
		width: 16px;
	}
	ul img {
		width: 20px;
	}
	ul span.tel {
		margin-left: 10px;
	}
	ul p.address {
		padding-top: 6px;
		font-size: 12px;
		color: #969696;
	}
	ul p.default-address { }

	ul p.default-address>img {
		display: none;
	}
	ul p.default-address>img.active {
		display: block;
	}

</style>