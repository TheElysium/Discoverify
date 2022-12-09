<template>
  <div>
    <div class="tile" :class="selected ? 'selected-frame' : ''">
      <div class="gradient-over-image" :class="selected ? 'selected-tile' : ''"></div>
      <img :src="item.image" :alt="item.name" :style="loading ? 'opacity: 0;' : 'opacity:1;'" @load="loading=false">
      <h2>{{item.name}}</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TileComponent',
  components: {

	},
	props: {
		item: Object,
    selected: Boolean
	},
  data(){
    return{
      loading: true
    }
  },
	methods: {
		select(){
			let selection = {
				name: this.item.name,
				spotifyId: this.item.id
			}
			this.$emit("updateSelection", selection);
		}
	}
}
</script>

<style>
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.3s ease-in-out;
}

.tile{
  position: relative;
  width: 100%;
  height: 12vw;
  box-sizing: border-box;
  transition: 0.2s ease-in-out;
}

.gradient-over-image{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(60, 248, 54, 0.7));
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
}

.tile h2{
  position: absolute;
  bottom: 0;
  left: 2vh;
  text-align: left;
  z-index: 2;
}

.gradient-over-image:hover {
  opacity: .8;
}

.selected-tile {
  background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(60, 248, 54, 0.7));
  opacity: .8;
}

.selected-tile:hover {
  opacity: .5;
}

.selected-frame {
  border: 0.2rem #3CF836 solid;
}
</style>