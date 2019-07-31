<template>
	<div class="page-wrapper">
		<ul>
			<li>
				<span>收货人</span>
				<input class="name" type="text" placeholder="输入收货人姓名" ref="receiveName">
			</li>
			<li>
				<span>手机号码</span>
				<input class="tel" type="text" placeholder="输入手机号码" ref="receiveTel">
			</li>
			<li @click="choose">
				<!--触发选择-->
				<span>省市区</span>
				<input class="address" type="text" readonly placeholder="选择省市区" v-model="this.city" ref="city" />
			</li>
			<li>
				<span>详细地址</span>
				<input class="detail-address" type="text" placeholder="输入详细地址"ref="address">
			</li>
		</ul>
		<div class="save" @click="toProfile">保 存</div>
		<div class="divwrap" v-if="show">
			<v-distpicker type="mobile"
			              @province="onChangeProvince1"
			              @city="onChangeCity"
			              @area="onChangeArea">
			</v-distpicker>
		</div>
		<!--遮罩层-->
		<div class="blacks" v-if="show" @click="countermand"></div>
	</div>
</template>

<script type="text/ecmascript-6">
        import VDistpicker from 'v-distpicker'
        export default {
                components: {VDistpicker},
                name: "particular",
                data() {
                        return {
                                lxr: '',
                                lxdh: '',
                                show: false,
                                //省市区
                                province: '',
                                city: '',
                                area: '',
	                        receiveName: '',
	                        receiveAddress: '',
	                        receiveTel: ''
                        }
                },
                props: ['ips'],
                methods: {
                        //取消选择地区
                        countermand: function () {
                                this.show = false
                        },
                        //打开选择地区
                        choose: function () {
                                this.show = true;
                        },
                        onChangeProvince1: function (a) {
                                this.province = a.value;
                                if (a.value == '台湾省') {
                                        this.show = false;
                                }
                        },
                        onChangeCity: function (a) {
                                this.city = a.value;
                        },
                        onChangeArea: function (a) {
                                this.area = a.value;
                                this.show = false;
                                this.city = this.province + this.city + this.area;
                        },
                        toProfile() {
                                this.receiveName = this.$refs.receiveName.value;
                                this.receiveTel = this.$refs.receiveTel.value;
                                this.receiveAddress = this.$refs.city.value + this.$refs.address.value;
                                this.$http({
	                                method: 'post',
                                        url: '/address/add',
	                                data: {
                                                receiveName: this.receiveName,
                                                receiveTel: this.receiveTel,
                                                receiveAddress: this.receiveAddress
	                                }
                                })
	                                .then(() => window.location.href='app.html#/add');
                        }
                }
        }
</script>

<style scoped>
	/*遮罩层*/
	.blacks {
		position: fixed;
		width: 100%;
		height: 50%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.45);
	}
	/*省市区三级联动*/
	.divwrap {
		height: 50%;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}

	/*外部*/
	.divwrap > .distpicker-address-wrapper {
		color: #0d0d0d;
		height: 100%;
	}

	/*头部*/
	.divwrap >>> .address-header {
		background: #000;
		color: #fff;
		width: 100%;
		position: fixed;
		bottom: 50%;
		height: 36px;
		font-size: 14px;
	}

	/*头部内容*/
	.divwrap >>> .address-header ul li {
		flex-grow: 1;
		text-align: center;
	}

	/*选择过省市区的头部*/
	.divwrap >>> .address-header .active {
		color: #fff;
	}

	/*内容部分*/
	.divwrap >>> .address-container {
		overflow: scroll;
		height: 100%;
	}

	/*点过的地区内容*/
	.divwrap >>> .address-container .active {
		color: red;
	}
	.page-wrapper { font-size: 16px; background-color: rgb(238,238,238); }
	ul {
		color: #909090;
		background-color: #fff;
	}
	ul>li {
		display: flex;
		height: 40px;
		border-bottom: 1px solid rgb(248,248,248);
	}
	ul>li>span {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-left: 10px;
		width: 100px;
	}
	ul>li>input {
		flex-grow: 1;
		outline: none;
		border: none;
	}
	::-webkit-input-placeholder{
		color: #707070;
	}

	.save {
		margin: 20px;
		height: 44px;
		line-height: 44px;
		border-radius: 6px;
		text-align: center;
		background-color: #94193f;
		color: #fff;

	}


</style>