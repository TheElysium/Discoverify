<template>
    <div>
      <div class="tracklist-header">
        <div class="title-container">
            <h2>Recommandations based on selected artists</h2>
        </div>
      </div>
      <div class="selected">
        <div v-for="artist in artists" v-bind:key="artist">
          <div class="selected-box"  v-on:click="removeSelected(artist)">
            <p>{{artist.name}}&nbsp; <span>&#10006;</span></p>
          </div>
        </div>
      </div>
      <div class="tracks-container">
        <div v-if="recommendedTracks">
          <div v-for="track in recommendedTracks" v-bind:key="track">
            <TrackComponent v-bind:track="track"></TrackComponent>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import TrackComponent from './TrackComponent.vue';
// import {getRecommendedTracks} from "@/spotifyRequests";
// import {filters} from "@/stores/store";

export default {
  name: 'TracklistComponent',
  components: {
    TrackComponent
  },
  props: {
    artists: Array,
    tracks: Array,
    recommendedTracks: Object
  },
  methods: {
    removeSelected(selection){
      console.log("remove")
      this.$emit("removeSelected", selection)
    }
  },
}
</script>

<style scoped>
.tracklist-header{
	border: 0.2rem solid #3CF836;
	border-right-width: 0;
	display: flex;
}

.title-container{
  height: 100%;
  width: fit-content;
  background-color: #3CF836;
}

h2{
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  color: black;
}

.selected{
	margin-top: 3vh;
	margin-left: 1.5vw;
	margin-bottom: 3vh;
  display: flex
}

.selected-box{
	border: #3CF836 0.1rem solid;
	width: fit-content;
  margin-right: 1vw;
}

.selected-box:hover{
	background-color: #3CF836;
	color: black;
}

.selected-box p{
	margin: 0.5vh;
}
</style>