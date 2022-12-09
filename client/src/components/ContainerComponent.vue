<template>
  <div>
		<TracksGenresComponent class="tracks-genres" @updateSelected="updateSelected" v-bind:selected-prop="selected"></TracksGenresComponent>
    <TracklistComponent class="tracklist" @removeSelected="removeSelected" v-bind:recommended-tracks="recommendedTracks.tracks" v-bind:artists="selected.artists" v-bind:tracks="selected.tracks"></TracklistComponent>
    <FiltersComponent class="filters" @updateFiltersValues="updateFiltersValues"></FiltersComponent>
  </div>
</template>

<script>
import TracklistComponent from './TracklistComponent.vue';
import TracksGenresComponent from './TracksGenresComponent.vue';
import FiltersComponent from './FiltersComponent.vue';
import {getRecommendedTracks} from "@/spotifyRequests";

export default {
  name: 'ContainerComponent',
  components: {
    TracksGenresComponent,
    TracklistComponent,
    FiltersComponent
	},
  data() {
    return {
      filters: {
        popularity:{
          filterName: "Popularity",
          min:0,
          max:100
        },
        energy:{
          filterName: "Energy",
          min:0,
          max:100
        },
        tempo:{
          filterName: "Tempo",
          min:0,
          max:100
        },
        vocals:{
          filterName: "Vocals",
          min:0,
          max:100
        },
      },
      selected: {
        artists: [],
        tracks: []
      },
      recommendedTracks: [],
    }
  },
  methods: {
    removeSelected(val){
      this.selected.artists = this.selected.artists.filter(a => a.id !== val.id)
      this.selected.tracks = this.selected.tracks.filter(a => a.id !== val.id)
      this.updateSelected(this.selected)
    },
    updateFiltersValues(val){
      this.filters = val;
      this.fetchRecommendedTracks()
    },
    updateSelected(val){
      this.selected = val;
      this.recommendedTracks = []
      if(this.selected.tracks.length !== 0 || this.selected.artists.length !== 0) {
        this.fetchRecommendedTracks();
      }
    },
    async fetchRecommendedTracks(){
      try {
        this.recommendedTracks = await getRecommendedTracks(
            this.parseSelection(this.selected.tracks),
            this.parseSelection(this.selected.artists),
            20,
            this.filters.popularity.min,
            this.filters.energy.min/100,
            this.filters.tempo.min*2,
            this.filters.vocals.min/100,
            this.filters.popularity.max,
            this.filters.energy.max/100,
            this.filters.tempo.max*2,
            this.filters.vocals.max/100,
            // seed_artists: seed_artists,
            // limit: limit,
            // min_popularity: min_popularity,
            // min_energy: min_energy,
            // min_tempo: min_tempo,
            // min_speechiness: min_speechiness,
            // max_popularity: max_popularity,
            // max_energy: max_energy,
            // max_tempo: max_tempo,
            // max_speechiness: max_speechiness
        );
      } catch (error) {
        console.log(error)
      }
    },
    parseSelection(selection) {
      let res = ""
      selection.forEach(s => res += s.id + ",")
      return res;
    }
  }
}
</script>

<style>
.tracks-genres {
	grid-area: tracks-genres;
}

.tracklist { 
	grid-area: tracklist;
	border-right: #3CF836 solid 0.2rem;
}

.filters { 
	grid-area: filters;
}
</style>