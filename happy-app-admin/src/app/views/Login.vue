<template>
	<div>
		<!-- 页头 -->
		<div class="header">
			<a href="">
				<img src="../assets/images/ico_fh.png" >
			</a>
			<div>
				<span class="normal" :class="{ active: loginType === 1}" @click="loginType = 1">账号登录</span>
				<span class="normal" :class="{ active: loginType !== 1}" @click="loginType = 0">无密码快速登录</span>
			</div>
		</div>
		<div class="content">
			<!-- 登录 -->
			<ul class="login active" v-show="loginType === 1">
				<li>
					<img src="../assets/images/mob.jpg" />
					<input v-model="pwdLoginInfo.account" class='account' type="text" placeholder="请输入邮箱/会员名或手机号" />
				</li>
				<li>
					<img src="../assets/images/lock.jpg" />
					<input v-model="pwdLoginInfo.pwd" class='pwd' type="password" placeholder="请输入登录密码" />
				</li>
				<li class="login"><button class='btn-pwd' @click="login">登录</button></li>
			</ul>
			<!-- 注册 -->
			<ul class="logon active" v-show="loginType !== 1">
				<li>
					<img src="../assets/images/mob.jpg" />
					<input class='phone' type="text" placeholder="请输入手机号" />
				</li>
				<li>
					<img src="../assets/images/phone.jpg" />
					<input v-model="loginInfo.code" class='code2' type="text" placeholder="请输入短信验证码" />
					<button v-text="code" @click="getCode" class='code'></button>
				</li>
				<li class="login"><button class='btn-phone' @click="logon">注册</button></li>
			</ul>
			<img src="../assets/images/ico_line.png" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import http from '../utils/http.js';
	import Cookies from 'js-cookie';

        export default {
                data: function(){
	                return {
	                        loginInfo: { phone: '', code: '' },
		                code: '获取验证码',
                                pwdLoginInfo: { account: '', pwd: '' },
                                loginType: 1, //表示手机登录
	                }
                },
	        methods: {
                        getCode: function(){
                                this.$http({ url: '/login/getcode' })
                                        .then(data => this.code = data)
                        },
                        logon: function(){
                                //客户端进行验证码比对，减少不必要的ajax请求
                                if(this.code !== this.loginInfo.code.toUpperCase()) {
                                        alert('验证码错误。。。');
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/login/phone',
                                        data: this.loginInfo
                                })
                                        .then(data => this.$router.replace(Cookies.get('target') || '/category'));
                        },
                        login: function() {
                                this.$http({
                                        method: 'post',
                                        url: '/login/pwd',
                                        data: this.pwdLoginInfo
                                })
                                        .then(data => this.$router.replace(Cookies.get('target') || '/category'));
                        }

	        }
        };
</script>

<style scoped>
	.header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e1e1e1;
	}
	.header>a {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		width: 30px;
	}
	.header>a>img {
		width: 100%;
	}
	.header>div {
		flex-grow: 1;
		text-align: center;
		height: 100%;
	}
	.header>div>span.normal {
		box-sizing: border-box;
		display: inline-block;
		margin: 0 10px;
		height: 100%;
		color: #1e1e1e;
		border: 1px solid transparent
	}
	.header>div>span.active {
		color: #c31f3a;
		border-bottom: 3px solid #c31f3a;
	}
	.content {

	}
	.content>img {
		width: 100%;
	}
	.content>ul {
		padding: 30px 40px 0;
		display: none;
		margin-bottom: 70px;
	}
	.content>ul.active { display: block; }
	.content>ul>li {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #e1e1e1;
		height: 46px;
	}
	.content>ul>li>img {
		flex-shrink: 0;
		margin-right: 10px;
		width: 16px;
		height: 16px;
	}
	.content>ul>li>input {
		flex-grow: 1;
		border: none;
		outline: none;
	}
	.content>ul>li>button {
		padding: 2px 4px;
		outline: none;
		border-radius: 4px;
		color: #a94765;
		border: 1px solid #e1e1e1;
		background-color: #FFF;
	}
	li.login {
		border: none !important;
	}
	li.login>button {
		margin-top: 30px;
		width: 100%;
		height: 35px;
		font-size: 16px;
		color: #fff !important;
		border: none !important;
		background-color: #94193f !important;
	}
</style>