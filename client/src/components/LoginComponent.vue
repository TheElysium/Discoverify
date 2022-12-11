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
			authUrl:   process.env.NODE_ENV !== 'production'
          ? 'http://localhost:8888/login'
          : 'https://app-discoverify.herokuapp.com/login',
		}
	}
}
</script>

<style scoped>

#login-button-container{
  border: 0.2rem #3CF836 solid;
  width: 60%;
  text-align: center;
  vertical-align: middle;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

#login-button-container:hover{
  background-color: #3CF836;
}

#login-button-container:hover a{
  color: black;
}

#login-button-container a{
  color: white;
  text-decoration: none;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
}


</style>