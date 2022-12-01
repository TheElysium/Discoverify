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
        <SearchComponent v-bind:selected="selected" @updateSelected="updateList"></SearchComponent>
			</div>
	</div>
	<div class="tiles-container">
		<div class="tiles-grid">
      <div v-for="item in topItems" :key="item">
        <TileComponent :item="parseItem(item)" @click="updateList(item)" :selected="selectedProp.tracks.filter(t => t.id === item.id).length !== 0 || selectedProp.artists.filter(t => t.id === item.id).length !== 0"></TileComponent>
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
import SearchComponent from './SearchComponent.vue';
import {getCurrentUserTopItems} from "@/spotifyRequests";

export default {
  name: 'TracksGenresComponent',
  components: {
    TileComponent,
    SearchComponent
  },
  props: {
    selectedProp: Object
  },
	data() {
		return{
			number: 5,
      selected: "artists",
      topItems: null,
      query: null,
		}
	},
  methods: {
    async getTopTracks(itemNumber) {
      try {
        const response = await getCurrentUserTopItems("tracks", itemNumber, "short_term");
        this.topItems = response.data.items;
        console.log(this.topItems);
      }
      catch (error) {
        console.log(error)
      }
    },
    async getTopArtists(itemNumber) {
      try {
        const response = await getCurrentUserTopItems("artists", itemNumber, "short_term");
        this.topItems = response.data.items;
        console.log(this.topItems);
      }
      catch (error) {
        console.log(error)
      }
    },
    updateList(item){
      let updateSelection = this.selectedProp
      if(this.selected === "tracks") {
        if(updateSelection.tracks.filter(t => t.id === item.id).length > 0){
          updateSelection.tracks = updateSelection.tracks.filter(t => t.id !== item.id);
        }
        else{
          if(updateSelection.tracks.length + updateSelection.artists.length < 5) {
            updateSelection.tracks.push(item)
          }
        }
      }
      else{
        if(updateSelection.artists.filter(t=>t.id === item.id).length > 0){
          console.log("Remove " + item.name)
          updateSelection.artists = updateSelection.artists.filter(t => t.id !== item.id);
        }
        else{
          if(updateSelection.tracks.length + updateSelection.artists.length < 5){
            updateSelection.artists.push(item)
          }
        }
        console.log(updateSelection)
      }
      this.$emit("updateSelected", updateSelection)
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
      if (item.type === "artist") {
        console.log(item)
        image = item.images[0].url;
      } else if (item.type === "track") {
        console.log(item)
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

.placeholder{
  position: relative;
  width: 100%;
  height: 12vw;
  box-sizing: border-box;
  transition: 0.2s ease-in-out;
  background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(60, 248, 54, 0.7));
}

.more{
	/*margin: 1vh;*/
	font-weight: bold;
  text-align: center;
}

.more p {
  display: inline-block;
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

.artists {
	grid-area: artists;
	text-align: center;
}

.tracks { 
	grid-area: tracks;
	text-align: center;
}

.button {
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.button:hover, .selected{
	background-color: #3CF836;
	color: black;
}

.search { 
	grid-area: search;
	border-left: 0.2rem solid;
	border-color: #3CF836;
  position: relative;
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
  /*height: 12vw;*/
}


</style>