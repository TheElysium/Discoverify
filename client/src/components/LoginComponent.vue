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
			authUrl: "https://accounts.spotify.com/authorize?" +
			"client_id=4b94731f947e41878f3400e277a68c85" +
			"&response_type=code" +
			"&redirect_uri=http://localhost:8080/" +
			"&scope=user-read-private%20playlist-modify-private%20user-top-read"
		}
	}
}
</script>

<style scoped>

</style>