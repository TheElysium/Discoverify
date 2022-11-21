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
      <div v-for="item in topItems" :key="item">
        <TileComponent :item="parseItem(item)" @click="updateList(item)"></TileComponent>
      </div>
		</div>
		<div class="more">
			<p v-if="number === 5" @click="number=50" >more artists &darr;</p>
			<p v-else @click="number=5" >less artists &uparrow;</p>
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
			number: 5,
      selected: "artists",
      topItems: null,
      selectedTracks: [],
      selectedArtists: []
		}
	},
  methods: {
    async getTopTracks(itemNumber) {
      try {
        const response = await getCurrentUserTopItems("tracks", itemNumber, "medium_term");
        this.topItems = response.data.items;
        console.log(this.topItems);
      }
      catch (error) {
        console.log(error)
      }
    },
    async getTopArtists(itemNumber) {
      try {
        const response = await getCurrentUserTopItems("artists", itemNumber, "medium_term");
        this.topItems = response.data.items;
        console.log(this.topItems);
      }
      catch (error) {
        console.log(error)
      }
    },
    updateList(item){
      if(this.selected === "tracks") {
        if(this.selectedTracks.includes(item)){
          this.selectedTracks = this.selectedTracks.filter(t => t !== item);
        }
        else{
          if(this.selectedTracks.length < 5) {
            this.selectedTracks.push(item)
          }
        }
        console.log(this.selectedTracks)
      }
      else{
        if(this.selectedArtists.includes(item)){
          this.selectedArtists = this.selectedArtists.filter(t => t !== item);
        }
        else{
          if(this.selectedArtists.length < 5) {
            this.selectedArtists.push(item)
          }
        }
        console.log(this.selectedArtists)
      }
      let selected = {
        artists: this.selectedArtists,
        tracks: this.selectedTracks
      }
      this.$emit("updateSelected", selected)
    },
    getTop() {
      if (this.selected === "tracks") {
        this.getTopTracks(this.number);
      }
      else if (this.selected === "artists") {
        this.getTopArtists(this.number);
      }
    },
    parseItem(item) {
      let image = null;
      if (this.selected === "artists") {
        image = item.images[0].url;
      } else if (this.selected === "tracks") {
        image = item.album.images[0].url
      }
      return {
        id: item.id,
        name: item.name,
        image: image,
      }
    }
  },

  created() {
    this.getTop(5);
  },

  watch: {
    selected: function() {
      this.getTop();
    },
    number: function () {
      this.getTop()
    }
  }
}
</script>

<style scoped>

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