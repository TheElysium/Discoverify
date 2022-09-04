<template>
	<div>
		<div class="selectors-container">
			<div class="artists button" @click="selected='artists'" :class="selected === 'artists' ? 'selected' : ''">
				<h2>Artists</h2>
			</div>
			<div class="tracks button" @click="selected='tracks'" :class="selected === 'tracks' ? 'selected' : ''">
				<h2>Tracks</h2>
			</div>
			<div class="search">
				<input class="search-bar" type="text" placeholder="Seach for a track, an artist ...">
			</div>
	</div>
	<div class="tiles-container">
		<div class="tiles-grid">
      <div v-for="artist in topArtists" :key="artist">
        <TileComponent :item="artist"></TileComponent>
      </div>
		</div>
		<div class="more">
			<p v-if="!more" @click="more = true" >more artists &darr;</p>
			<p v-else @click="more = false" >less artists &uparrow;</p>
		</div>
		</div>
	</div>
</template>

<script>

import TileComponent from './TileComponent.vue';
import {getCurrentUserTopItems} from "@/spotifyRequests";

export default {
  name: 'TracksGenresComponent',
  components: {
      TileComponent
  },
	data() {
		return{
			more: false,
      selected: "artist",
      topArtists: null,
      topTracks: null,
		}
	},
  methods: {
    async getTopTracks(itemNumber) {
      if(!this.topTracks){
        try {
          const response = await getCurrentUserTopItems("tracks", itemNumber, "short_term");
          this.topTracks = response.data;
        }
        catch (error) {
          console.log(error)
        }
      }
    },
    async getTopArtists(itemNumber) {
      if(!this.topArtists){
        try {
          const response = await getCurrentUserTopItems("artists", itemNumber, "short_term");
          this.topArtists = response.data.items;
          console.log(this.topArtists);
        }
        catch (error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    this.getTopArtists(5);
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

.button:hover, .selected{
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