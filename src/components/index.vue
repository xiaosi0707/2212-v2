<template>
	<div class="index">
		index
		<ul>
			<li>
				<router-link active-class="active" to="/index/list">list</router-link>
			</li>
			<li>
				<router-link active-class="active" to="/index/message">message</router-link>
			</li>
		</ul>
		<router-view style="background: pink; padding: 30px;" />
	</div>
</template>
<style>
	.active-child {
		background: red;
		color: white;
	}
</style>