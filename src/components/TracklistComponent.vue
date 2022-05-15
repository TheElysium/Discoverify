<template>
    <div>
      <div class="tracklist-header">
        <div class="title-container">
            <h2>Recommandations based on selected artists</h2>
        </div>
      </div>
      <div class="selected">
        <div class="selected-box">

        </div>
      </div>
      <div class="tracks-container">
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
        <TrackComponent></TrackComponent>
      </div>
    </div>
</template>

<script>
import TrackComponent from './TrackComponent.vue';

export default {
  name: 'TracklistComponent',
  components: {
    TrackComponent
  }
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
</style>