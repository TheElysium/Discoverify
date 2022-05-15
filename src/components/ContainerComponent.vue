<template>
  <div>
		<TracksGenresComponent class="tracks-genres"></TracksGenresComponent>
    <TracklistComponent class="tracklist"></TracklistComponent>
    <FiltersComponent class="filters"></FiltersComponent>
  </div>
</template>

<script>
import TracklistComponent from './TracklistComponent.vue';
import TracksGenresComponent from './TracksGenresComponent.vue';
import FiltersComponent from './FiltersComponent.vue';

export default {
  name: 'ContainerComponent',
  components: {
    TracksGenresComponent,
    TracklistComponent,
    FiltersComponent
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