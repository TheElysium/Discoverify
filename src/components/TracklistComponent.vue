<template>
    <div>
      <div class="tracklist-header">
        <div class="title-container">
            <h2>Recommandations based on selected artists</h2>
        </div>
      </div>
      <div class="selected">
        <div class="selected-box">
					<p>I Hate Models &nbsp; &#10006;</p>
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

.selected{
	margin-top: 3vh;
	margin-left: 1.5vw;
	margin-bottom: 3vh;
}

.selected-box{
	border: #3CF836 0.1rem solid;
	width: fit-content;
}

.selected-box p{
	margin: 0.5vh;
}
</style>