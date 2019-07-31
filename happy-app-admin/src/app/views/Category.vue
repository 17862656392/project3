<template>
	<div class="page-wrapper">
		<!-- 页头 -->
		<div class="header">
			<div class="search">
				<img src="../assets/images/s_ico1.png" >
				<span>搜索商品,品牌</span>
			</div>
		</div>
		<!-- 内容 -->
		<div class="content">
			<div class="content-left" ref="left">
				<ul class="category-main">
					<li v-for="item in mainList" :key="item.id"
					    :class="{ active: item.id === curCid }"
					    @click="initSubLists(item.id)">
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="content-right" ref="right">
				<div>
					<div class="avatar-wrapper" v-if="avatar">
						<img class="avatar" :src="avatar" />
					</div>
					<ul class="category-sub clearfix" v-if="subList.length > 0">
						<li v-for="item in subList" :key="item.id">
							<router-link :to="`/list/${ curCid }/${ item.id }`">
								<img :src="item.avatar"/>
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无二级分类，敬请期待...</p>
				</div>
			</div>
		</div>
		<Footer></Footer> <!-- 使用 -->
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';
        import Footer from '../components/Footer.vue'; //导入
        import { createNamespacedHelpers } from 'vuex'
        let { mapState, mapGetters, mapActions } = createNamespacedHelpers('category');

	export default {
                components: { Footer }, //注册
                computed: {
                        ...mapState(['mainList', 'curCid']),
                        ...mapGetters(['subList']),
                        avatar() {
                                if(this.curCid === 0) return '';
                                else return this.mainList.find(item => item.id === this.curCid).avatar;
                        }
                },
                methods: {
                        ...mapActions(['initMainList', 'initSubLists']),
                        _initLeftScroll() { if(!this.leftScroll) this.leftScroll = new BScroll(this.$refs.left, {click: true});  },
                        _initAndRefreshRightScroll() {
                                imagesLoaded(this.$refs.right, () =>{
                                        this.$nextTick(() => { //$nextTick()等同设置的setTimeout()
                                                if(!this.rightScroll) this.rightScroll = new BScroll(this.$refs.right, {click: true});
                                                else {
                                                        this.rightScroll.scrollTo(0, 0);
                                                        this.rightScroll.refresh();
                                                }
                                        });
                                });
                        }
                },
                //创建
                created: function(){ this.initMainList(); },
                updated: function(){
                        this._initLeftScroll();
                        this._initAndRefreshRightScroll();
                }
        };
</script>
<style scoped>
	.page-wrapper {
		display: flex;
		flex-direction: column;
	}
	.header {
		box-sizing: border-box;
		padding: 10px 20px;
		height: 50px;
		border-bottom: 1px solid rgb(243,245,245);
	}
	.search {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-radius: 50px;
		background-color: #f3f5f5;
	}
	.search>img {
		width: 16px;
	}
	.search>span {
		margin-left: 4px;
		font-size: 16px;
		color: rgb(147,147,147);
		white-space: normal;
	}
	/* 内容 */
	.content {
		display: flex;
		flex: 1;
		overflow: auto;
		width: 100%;
		height: 100%;
	}
	.content ul.category-main {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.content-left {
		display: flex;
		flex-shrink: 0;
		overflow: auto;
		width: 25%;
		height: 100%;
		border-right: 1px solid rgb(243,245,245);
	}
	.content-left .category-main>li {
		box-sizing: border-box;
		margin-bottom: 14px;
		display: flex;
		align-items: center;
		flex-grow: 1;
		font-size: 15px;
	}
	.content-left .category-main>li.active>span {
		color: #c4193f;
		border-left: 4px solid #c4193f;
	}
	.content-left .category-main>li>span {
		width: 100%;
		color: #939393;
		text-align: center;
		border-left: 4px solid transparent;
	}
	.content-right {
		overflow: auto;
		flex-grow: 1;
	}
	.content-right .avatar-wrapper { padding: 13px; }
	.content-right .avatar-wrapper>img.avatar { width: 100%; }
	.category-sub {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.category-sub>li {
		text-align: center;
		width: 33.333333%;
	}
	.category-sub>li>a {
		box-sizing: border-box;
		padding: 0 10px;
		display: block;
		font-size: 14px;
		color: #343434;
	}
	.category-sub>li>a>img {
		width: 100%;
	}
	.category-sub>li>a>span {
	}
</style>