<template>
  <div class="container">
    <HeaderComponent class="header"></HeaderComponent>
    <ContainerComponent class="components-container" v-if="token.accessToken"></ContainerComponent>
    <LoginComponent class="login" v-else></LoginComponent>
    {{$route.query.code}}
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ContainerComponent from './components/ContainerComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import { token } from './stores/store'
import {getAccessToken} from "@/login";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ContainerComponent,
    LoginComponent
  },
	data() {
		return {
      token,
		}
	},
  created() {
    getAccessToken()
  }
}
</script>

<style>

@font-face {
  font-family: "Sequel";
  src: url(fonts/sequel/Sequel100Black-55.ttf) format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(fonts/sequel/Sequel100Black-65.ttf) format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(fonts/sequel/Sequel100Black-75.ttf) format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(fonts/sequel/Sequel100Black-96.ttf) format("truetype");
  font-weight: 900;
  font-style: italic;
}

@font-face {
	font-family: "Poppins";
	src: url(fonts/poppins/Poppins-Regular.ttf) format("truetype");
	font-weight: 400;
	font-style: normal;
}

@font-face {
	font-family: "Poppins";
	src: url(fonts/poppins/Poppins-SemiBold.ttf) format("truetype");
	font-weight: 600;
	font-style: normal;
}


html{
  background-color: black;
  font-size: 100%;
}

#app {
  font-family: Poppins, Sequel, sans-serif;
  color: white;
}

h2{
	font-family: Sequel;
	font-weight: 700;
	font-size: 1.2rem;
	margin-top: 1vh;
	margin-bottom: 1vh;
}

p{
	font-weight: 600;
}

.container {
  margin-left: 3vw;
  margin-right: 3vw;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
  grid-auto-rows: min-content;
  gap: 0px 0px; 
  grid-template-areas: 
    "header header header header header"
    "components-container components-container components-container components-container components-container"
}

.header { grid-area: header; }

.components-container { 
  border: 0.2rem solid;
  border-color: #3CF836;
  grid-area: components-container; 
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  grid-auto-rows: min-content;
  gap: 0px 0px; 
  grid-template-areas: 
    "tracks-genres tracks-genres tracks-genres tracks-genres "
    "tracklist tracklist tracklist filters"; 
}
</style>
