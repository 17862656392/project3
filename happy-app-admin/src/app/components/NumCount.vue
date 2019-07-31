<template>
	<div class="num-count">
		<span class="decrease" @click="$emit('decrease')">-</span>
		<span class="count" v-text="count"></span>
		<span class="increase" @click="$emit('increase')">+</span>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: [ 'count' ]
        };
</script>

<style scoped>
	.num-count {
		width: 90px;
		height: 20px;
		display: flex;
	}
	.num-count>span {
		flex: 0 0 auto;
		width: 26px;
		text-align: center;
		font-weight: bolder;
	}
	.num-count>span.count {
		flex-grow: 1;
		background-color: rgb(244,244,244);
	}
</style>