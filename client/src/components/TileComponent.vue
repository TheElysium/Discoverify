<template>
  <div>
    <div class="tile" @click="select">
      <div class="gradient-over-image"></div>
      <img :src="item.images[0].url" alt="">
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
		item: Object
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
}

.tile h2{
  position: absolute;
  bottom: 0;
  left: 2vh;
}
</style>