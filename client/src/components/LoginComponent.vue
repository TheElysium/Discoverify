<template>
	<div>
		<div id="login-button-container">
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

#login-button-container{
  background-color: #3CF836;
  width: 70%;
  height: 5vh;
  text-align: center;
  vertical-align: middle;
}

</style>