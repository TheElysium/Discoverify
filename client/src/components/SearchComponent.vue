<template>
  <div>
    <input class="search-bar" type="text" placeholder="Seach for a track, an artist ..." v-model="query" @focusin="focus = true">
  </div>
  <div v-if="result && focus">
    <div  id="result-container" v-if="selected === 'artists'">
      <div v-for="r in result.artists.items" v-bind:key="r" class="result" @click="select(r)">
        <img class="result-image" :src="r.images[2].url">
        <p class="result-name">{{r.name}}</p>
      </div>
    </div>
    <div  id="result-container" v-else>
      <div v-for="r in result.tracks.items" v-bind:key="r" class="result"  @click="select(r)">
        <img class="result-image" :src="r.album.images[1].url">
        <p class="result-name">{{r.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>

import {search} from "@/spotifyRequests";

export default {
  name: 'SearchComponent',
  components: {

	},
	props: {
		item: Object,
    selected: String
	},
  data(){
    return {
      query: null,
      result: null,
      focus: false,
    }
  },
	methods: {
    select(item){
      this.focus = false
      this.$emit("updateSelected", item)
    }
  },
  watch: {
    query: async function () {
      try {
        if(this.query.length === 0){
          this.result = null
        }
        else{
          this.result = await search(this.query)
        }
        console.log(this.result)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.search-bar{
  background-color: transparent;
  border: none;
  width: 100%;
  font-family: Sequel;
  font-weight: 700;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1vh;
  margin-bottom: 1vh;
  padding: 0;
}

.search-bar::placeholder{
  opacity: 1;
}

.search-bar:focus{
  outline: none;
}

.search-bar:focus::placeholder {
  color: transparent;
}

#result-container{
  position: absolute;
  z-index: 10;
  background-color: black;
  outline: 0.2rem #3CF836 solid;
  border-top: none;
  color: white;
  font-size: 1.2rem;
  width: 100%;
  padding-top: 1vh;
}

.result{
  display: grid;
  grid-template-columns: 20% 80%;
  align-self: center;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 2vh;
  transition: ease 300ms;
  height: 100%;
}

.result:hover{
  background-color: #3CF836;
  color: black;
}


.result p {
  align-self: center;
  margin-left: 1vw;
}

.result img{
  align-self: center;
  height: 6vh;
}

</style>