<template>
    <div>
      <div class="tracklist-header">
        <div class="title-container">
            <h2>Recommandations based on selected artists & tracks</h2>
        </div>
      </div>
      <div class="selected">
        <div v-for="artist in artists" v-bind:key="artist">
          <div class="selected-box"  v-on:click="removeSelected(artist)">
            <p>{{artist.name}}&nbsp; <span>&#10006;</span></p>
          </div>
        </div>
        <div v-for="track in tracks" v-bind:key="track">
          <div class="selected-box"  v-on:click="removeSelected(track)">
            <p>{{track.name}}&nbsp; <span>&#10006;</span></p>
          </div>
        </div>
      </div>
      <div class="tracks-container">
        <div v-if="recommendedTracks">
          <div v-for="track in recommendedTracks" v-bind:key="track">
            <TrackComponent v-bind:track="track"></TrackComponent>
          </div>
        </div>
        <div v-else-if="tracks.length !== 0 || artists.length !== 0">
          <div v-for="i in 20" :key="i" class="track"></div>
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
      this.$emit("removeSelected", selection)
    }
  },
}
</script>

<style scoped>

@keyframes fadeIn {
  from { opacity: 1; }
  to { opacity: 0.5; }
}

.track {
  background-image: linear-gradient(to left, rgba(13, 38, 12, 0.7), rgba(60, 248, 54, 0.7));
  height: 8vh;
  margin-top: 1vw;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  animation: fadeIn 1s infinite alternate;
}

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

.fade-in-enter-active {
  transition: all 0.5s ease;
}

.fade-in-leave-active {
  transition: all 0.5s ease;
}

.fade-in-enter, .fade-in-leave-to {
  position: absolute; /* add for smooth transition between elements */
  opacity: 0;
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
  display: flex;
}

.selected-box{
	border: #3CF836 0.1rem solid;
	width: fit-content;
  margin-right: 1vw;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.selected-box:hover{
	background-color: #3CF836;
	color: black;
}

.selected-box p{
	margin: 0.5vh;
}

.tracks-container{
  margin-bottom: 5vh;
}
</style>