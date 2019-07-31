<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-top">
				<h1 class="title" v-text="title"></h1>
			</div>
			<div class="header-nav" ref="nav">
				<ul>
					<li v-for="item in navList" :key="item.id">
						<router-link :to="`/list/${ mainId }/${ item.id}`" replace v-text="item.name"></router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="content" ref="content">
			<div>
				<ul class="product" v-if="$store.state.product.list.length > 0">
					<li v-for="item in $store.state.product.list" :key="item.id">
						<router-link :to="`/detail?id=${ item.id }`">
							<img :src="item.avatar" />
							<h3 v-text="item.name"></h3>
							<p v-text="item.remark"></p>
							<span class="price" v-text="`￥${item.price}`"></span> <span class="old-price" v-text="`￥${item.oldPrice}`"></span>
						</router-link>
					</li>
				</ul>
				<p v-else>暂无商品，敬请期待</p>
				<p v-show="isLoading">loading...</p>
				<p v-show="$store.state.product.list.length > 0 && !hasMore">已到达底部...</p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';

        export default {
                data: function(){
                        return {
                                mainId: 0,
                                subId: 0,
                                scrollY: 0,
                                isLoading: false,
                                hasMore: true
                        };
                },
                computed: {
                        title() {
                                return this.mainId ? this.$store.state.category.mainList.find(item => item.id === this.mainId).name : '';
                        },
                        navList() {
                                return this.mainId ? this.$store.state.category.subLists[this.mainId] : [];
                        }
                },
                watch: {
                        subId(newValue, oldValue) {
                                this.hasMore = true;
                                this._getData(false);
                        },
                        isLoading(newValue, oldValue) {
                                //isloading从 true-> false 变化一次，就说明完成了一次ajax请求
                                if((!newValue) && this.hasMore && this.scroll) this.scroll.finishPullUp();
                        }
                },
                methods: {
                        _getData(loadMore) {
                                this.isLoading = true;
                                this.$store.dispatch('product/getData', {
                                        subId: this.subId,
                                        loadMore
                                }).then((flag) => {
                                        this.isLoading = false;
                                        this.hasMore = flag;
                                });
                        },
                        _initAndRefreshNavScroll() {
                                let ul = this.$refs.nav.querySelector('ul');
                                let lis = ul.querySelectorAll('li');
                                let lastLi = lis[lis.length - 1];
                                let width = lastLi.offsetLeft + lastLi.clientWidth;
                                ul.style.width = width + 'px';

                                this.$nextTick(() => {
                                        let target = ul.querySelector('.active');
                                        if(!this.navScroll) {
                                                this.navScroll = new BScroll(this.$refs.nav, {
                                                        scrollY: false,
                                                        scrollX: true,
                                                        click: true
                                                });
                                                this.navScroll.scrollToElement(target, 600);
                                        } else {
                                                this.navScroll.refresh();
                                                this.navScroll.scrollToElement(target, 600);
                                        }
                                });
                        },
                        _initAndRefreshContentScroll() {
                                imagesLoaded(this.$refs.content, () => {
                                        this.$nextTick(() => {
                                                if(!this.scroll) {
                                                        this.scroll = new BScroll(this.$refs.content, {
                                                                click: true,
                                                                pullUpLoad: { threshold: -50 } //触发pullingUp事件的临界距离
                                                        });
                                                        this.scroll.on('pullingUp', () => this._getData(true));
                                                }
                                                else this.scroll.refresh();
                                        });
                                });
                        }
                },
                activated() {
                        if(this.$store.state.category.mainList < 1) { //如果用户在当前页面点击刷新，跳回分类页面（单页面最怕用户刷新）
                                this.$router.replace('/category');
                                return;
                        }
                        if(this.scroll) {
                                this.scroll.refresh();
                                this.scroll.scrollTo(0, this.scrollY);
                        }
                        this.mainId = parseInt(this.$route.params.mainId);
                        this.subId = parseInt(this.$route.params.subId);
                },
                deactivated() { if(this.scroll) this.scrollY = this.scroll.y; },
                updated() {
                        this._initAndRefreshNavScroll();
                        this._initAndRefreshContentScroll();
                },
                destroyed() {
                        if(this.scroll) this.scroll.destroy();
                        if(this.navScroll) this.navScroll.destroy();
                },
                // 路由守卫
                beforeRouteUpdate(to, from, next) { // 路由从激活到激活时，且路由传参的参数变化时，才会被调用
                        this.subId = parseInt(to.params.subId);
                        next();
                }
        };
</script>

<style scoped>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		font-size: 14px;
		width: 100%;
		height:100%;
	}
	.header {
		align-items: center;
		flex-shrink: 0;
		/*height: 45px;*/
		background-color: #fafafa;
	}
	.header-top {
		position: relative;
		flex-shrink: 0;
	}
	.header-top>h1 {
		text-align: center;
		font-size: 18px;
		font-weight: normal;
		height: 45px;
		line-height: 45px;
		background-color: rgb(250,250,250);
	}
	.header-nav {
		border: 1px solid rgb(240,240,240);
		overflow: hidden;
		background-color: #fff;
	}
	.header-nav>ul {
		display: flex;
	}
	.header-nav>ul>li {
		flex-shrink: 0;
	}
	.header-nav>ul>li>a {
		display: block;
		padding: 0 16px;
		height: 40px;
		line-height: 40px;
		color: #000;
		border-bottom: 2px solid transparent;
		box-sizing: border-box;
	}
	.header-nav>ul>li>a.active {
		border-bottom: 2px solid #c4193f;
		color: #c4193f;
	}
	.content {
		overflow: auto;
		flex-grow: 1;
	}
	.product {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		border-top: 6px solid rgb(240,240,240);
		border-right: 6px solid rgb(240,240,240);
	}
	.product>li {
		padding-bottom: 10px;
		box-sizing: border-box;
		width: 50%;
		background-color: #fff;
		border: 6px solid rgb(240,240,240);
		border-top: none;
		border-right: none;
	}
	.product>li>a {
		display: block;
	}
	.product>li>a>img {
		width: 100%;
	}
	.product>li>a>h3 {
		margin-left: 10px;
		font-size: 14px;
		font-weight: normal;
		color: #323232;
	}
	.product a>p {
		margin-left: 10px;
		color: #787878;
		font-size: 14px;
		font-weight: normal;
	}
	.product a>span {
		font-weight: normal;
	}
	.product a>span.price {
		margin-left: 10px;
		color: #c4193f;
	}
	.product a>span.old-price {
		color: #959595;
		text-decoration: line-through;
	}
</style>