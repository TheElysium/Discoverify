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
		<div v-if="topItems" class="tiles-grid">
      <div v-for="item in topItems" :key="item">
        <TileComponent :item="parseItem(item)" @click="updateList(item)" :selected="selectedProp.tracks.filter(t => t.id === item.id).length !== 0 || selectedProp.artists.filter(t => t.id === item.id).length !== 0"></TileComponent>
      </div>
		</div>
    <div class="tiles-grid" v-else>
      <div v-for="i in 5" :key="i" class="tile">
        <img src="../assets/tile-placeholder.svg" alt="">
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
    selectedProp: Object,
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
      }
      catch (error) {
        console.log(error)
      }
    },
    async getTopArtists(itemNumber) {
      try {
        const response = await getCurrentUserTopItems("artists", itemNumber, "short_term");
        this.topItems = response.data.items;
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
          updateSelection.artists = updateSelection.artists.filter(t => t.id !== item.id);
        }
        else{
          if(updateSelection.tracks.length + updateSelection.artists.length < 5){
            updateSelection.artists.push(item)
          }
        }
      }
      this.$emit("updateSelected", updateSelection)
    },
    async getTop() {
      if (this.selected === "tracks") {
        this.topItems=null;
        await this.getTopTracks(this.number);
      }
      else if (this.selected === "artists") {
        this.topItems=null;
        await this.getTopArtists(this.number);
      }
    },
    parseItem(item) {
      let image = null;
      if (item.type === "artist") {
        image = item.images[0].url;
      } else if (item.type === "track") {
        image = item.album.images[0].url
      }
      return {
        id: item.id,
        name: item.name,
        image: image,
      }
    }
  },

  async created() {
    await this.getTop(5);
    console.log(this.topItems)
    this.updateList(this.topItems[0])
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

.tile{
  position: relative;
  width: 100%;
  height: 12vw;
  box-sizing: border-box;
  transition: 0.2s ease-in-out;
  animation: fadeIn 1s infinite alternate;
}

@keyframes fadeIn {
  from { opacity: 1; }
  to { opacity: 0.5; }
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