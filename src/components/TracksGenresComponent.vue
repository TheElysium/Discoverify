<template>
    <div>
        <div class="selectors-container">
            <div class="artists button">
                <h3>Artists</h3>
            </div>
            <div class="tracks button">
                <h3>Tracks</h3>
            </div>
            <div class="search">
                <input class="search-bar" type="text" placeholder="Seach for a track, an artist ...">
            </div>
        </div>
        <div class="tiles-container">
            <div class="tiles-grid">
                <TileComponent></TileComponent>
                <TileComponent></TileComponent>
                <TileComponent></TileComponent>
                <TileComponent></TileComponent>
                <TileComponent></TileComponent>
            </div>
        </div>
    </div>
</template>

<script>

import TileComponent from './TileComponent.vue';

export default {
  name: 'TracksGenresComponent',
  components: {
      TileComponent
  }
}
</script>

<style>
h3{
    font-family: Sequel;
    font-weight: 700;
    margin-top: 1vh;
    margin-bottom: 1vh;
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

.artists { 
    grid-area: artists; 
    text-align: center;

}

.tracks { 
    grid-area: tracks;
    text-align: center;
}

.button:hover{
    background-color: #3CF836;
    color: black;
}

.search { 
    grid-area: search; 
    border-left: 0.2rem solid;
    border-color: #3CF836;
}

.tiles-container{
    margin: 1.2vw 1.2vw 2vw 1.2vw;
}

.tiles-grid {
    grid-area: tiles-container; 
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
    grid-template-rows: repeat(auto-fill, 1fr); 
    gap: 0px 0.5vw; 
}


</style>