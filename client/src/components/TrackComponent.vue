<template>
	<div>
		<div class="track" v-if="track" @mouseenter="playPreview" @mouseleave="stopPreview">
<!--			<div class="play" v-on:click="playTrack">-->
			<div class="play">
        <a :href="track.external_urls.spotify" target="_blank">
					<img src="../assets/play.png" alt="">
        </a>
			</div>
			<div class="title">
					<p class="name">{{track.name}}</p>
					<p class="artist">{{track.artists[0].name}}</p>
			</div>
			<div class="album">
				<p>{{track.album.name}}</p>
			</div>
			<div class="duration">
				<p>{{millisToMinutesAndSeconds(track.duration_ms)}}</p>
			</div>
			<div class="cover">
				<img :src="track.album.images[0].url" :alt="track.name +' cover'" :style="loading ? 'opacity: 0;' : 'opacity:1;'" @load="loading=false">
			</div>
    </div>
	</div>
</template>

<script>

import {playTrack} from "@/spotifyRequests";

export default {
  name: 'TrackComponent',
  components: {
  },
  props: {
    track: Object,
  },
  data(){
    return{
      preview: new Audio(this.track.preview_url),
      hovered: false,
      loading: true
    }
  },
  created() {
    this.preview.volume = 0.0
  },
  methods: {
    millisToMinutesAndSeconds(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    playTrack(){
      playTrack([this.track.uri])
    },
    fadeIn() {
      if (this.preview.volume < .6 && this.hovered === true) {
        this.preview.volume += .05;
        setTimeout(this.fadeIn, 200);
      }
    },
    fadeOut() {
      if (this.preview.volume >= 0) {
        if(this.preview.volume < .1){
          this.preview.volume = 0
        }
        else{
          this.preview.volume -= .05;
          setTimeout(this.fadeOut, 75);
        }
      }
    },
    playPreview(){
      if(this.track.preview_url !==  null){
        this.hovered = true
        this.preview.load()
        this.preview.play()
        this.fadeIn()
      }
    },
    stopPreview(){
      this.hovered = false
      // this.preview.load()
      // this.preview.volume = 0
      this.fadeOut()
    }
  }
}
</script>

<style scoped>
.track{
	border: 0.13rem solid #3CF836;
	height: 8vh;
	margin-top: 1vw;
	margin-left: 1.5vw;
	margin-right: 1.5vw;
	padding-left: 1.5vw;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	gap: 0px 0px;
	grid-template-areas:
    "play title title title title title title title album album album album album duration . cover cover";
	align-items:center;
  transition: ease 300ms;
}

.track:hover{
	background-color: #3CF836;
	color: black;
  margin-left: 1.2vw;
  margin-right: 1.2vw;
}

.title {
	grid-area: title;
	font-size: 1.2rem;
}

.album {
	grid-area: album;
}

.duration {
	grid-area: duration;
}

.cover {
	grid-area: cover;
	height: 100%;
	overflow: hidden;
}

.cover img{
	object-fit: cover;
  transition: 0.2s ease-in-out;
}

.play{
	grid-area: play;
	width: 50%;
	cursor: pointer;
}

.play img{
	object-fit: scale-down;
}

.track p{
	margin: 0;
}

.name{
	font-family: Sequel;
	font-weight: 600;
}

.artist{
	margin-top: -0.5vh !important;
	font-size: 1rem;
	font-weight: 500;
}
</style>