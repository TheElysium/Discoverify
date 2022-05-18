<template>
	<div>
		<div class="selectors-container">
			<div class="artists button">
				<h2>Artists</h2>
			</div>
			<div class="tracks button">
				<h2>Tracks</h2>
			</div>
			<div class="search">
				<input class="search-bar" type="text" placeholder="Seach for a track, an artist ...">
			</div>
	</div>
	<div class="tiles-container">
		<div class="tiles-grid top5" v-if="!more">
<!--	TODO En gros on chargera les 5 premiers tracks / artists, et si l'user clique sur more ... on sélectionne les 50 premiers (le max dispo avec l'API Google)-->
			<TileComponent></TileComponent>
			<TileComponent></TileComponent>
			<TileComponent></TileComponent>
			<TileComponent></TileComponent>
			<TileComponent></TileComponent>
		</div>
		<div class="tiles-grid top50" v-if="more">
		</div>
		<div class="more">
			<p @click="more = true" >more artists &darr;</p>
		</div>
		</div>
	</div>
</template>

<script>

import TileComponent from './TileComponent.vue';

export default {
  name: 'TracksGenresComponent',
  components: {
      TileComponent
  },
	data() {
		return{
			more: false,
		}
	}
}
</script>

<style>

.more{
	margin: 1vh;
	font-weight: bold;
	cursor: pointer;
}

.selectors-container{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-areas:
	"artists tracks . . . . . . search search search"
	"tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container tiles-container";
	border-bottom: 0.2rem solid;
	border-color: #3CF836;
}

.search-bar{
	background-color: transparent;
	border: none;
	width: 100%;
	font-family: Sequel;
	font-weight: 700;
	color: white;
	font-size: 1.2rem;
	text-align: center;
	margin-top: 1vh;
	margin-bottom: 1vh;
	padding: 0;
}

.search-bar::placeholder{
	opacity: 1;
}

.search-bar:focus{
	outline: none;
}

.search-bar:focus::placeholder {
	color: transparent;
}

.artists { 
	grid-area: artists;
	text-align: center;
}

.tracks { 
	grid-area: tracks;
	text-align: center;
}

.button:hover{
	background-color: #3CF836;
	color: black;
	transition: ease 300ms;
}

.search { 
	grid-area: search;
	border-left: 0.2rem solid;
	border-color: #3CF836;
}

.tiles-container{
	grid-area: tiles-container;
	margin: 1.2vw 1.2vw 0vw 1.2vw;
	text-align: center;
}

.tiles-grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: repeat(auto-fill, 1fr);
	gap: 1vw 0.5vw;
	overflow: hidden;
}


</style>