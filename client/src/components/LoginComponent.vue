<template>
	<div>
		<div class="login-button-container">
			<a v-bind:href="authUrl">
				Login with Spotify
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "LoginComponent",
	data(){
		return{
			authUrl: "http://localhost:8888/login"
		}
	}
}
</script>

<style scoped>

</style>