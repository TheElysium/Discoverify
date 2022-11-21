<template>
  <div>
    <div class="tile" @click="select">
      <div class="gradient-over-image" :class="selected ? 'selected-tile' : ''"></div>
      <img :src="item.image" alt="">
      <h2>{{item.name}}</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TileComponent',
  components: {

	},
  data() {
    return {
      selected: false,
    }
  },
	props: {
		item: Object,
	},
	methods: {
		select(){
			let selection = {
				name: this.item.name,
				spotifyId: this.item.id
			}
      this.selected = !this.selected
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
}

.tile{
  position: relative;
  width: 100%;
  height: 12vw;
}

.gradient-over-image{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(60,248,54,0.25));
  transition: background-image 0.2s ease-in-out;
}

.tile h2{
  position: absolute;
  bottom: 0;
  left: 2vh;
  text-align: left;
}

.gradient-over-image:hover {
  background-color: rgba(117, 109, 109, 0.45);
}

.selected-tile {
  background-image: linear-gradient(to top, rgba(0,0,0,0.7), rgba(60, 248, 54, 0.7));
}
</style>