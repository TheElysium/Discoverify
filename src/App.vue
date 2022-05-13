<template>
  <div class="container">
    <HeaderComponent class="header"></HeaderComponent>
    <ContainerComponent class="components-container"></ContainerComponent>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import ContainerComponent from './components/ContainerComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ContainerComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

@font-face {
  font-family: "Sequel";
  src: url(./fonts/sequel/Sequel100Black-55.ttf) format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(./fonts/sequel/Sequel100Black-65.ttf) format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(./fonts/sequel/Sequel100Black-75.ttf) format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Sequel";
  src: url(./fonts/sequel/Sequel100Black-96.ttf) format("truetype");
  font-weight: 900;
  font-style: italic;
}

html{
  background-color: black;
  font-size: 100%;
}

#app {
  font-family: Poppins, Sequel, sans-serif;
  color: white;
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
  grid-auto-rows: min-content;
  gap: 0px 0px; 
  grid-template-areas: 
    "tracks-genres tracks-genres tracks-genres tracks-genres tracks-genres"
    "tracklist tracklist tracklist tracklist filters"; 
}
</style>
