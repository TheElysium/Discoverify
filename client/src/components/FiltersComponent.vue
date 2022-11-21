<template>
    <div>
			<div class="filters-header">
				<div class="title-container">
					<h2>Filters</h2>
				</div>
			</div>
			<div class="filters-container">
				<div class="filter-indicator low"><p>Low</p></div>
				<div class="filter-indicator high"><p>High</p></div>
				<FilterComponent class="popularity" v-bind:filter-name="'Popularity'" @updateFilterValues="updateFilterValues"></FilterComponent>
				<FilterComponent class="energy" v-bind:filter-name="'Energy'"  @updateFilterValues="updateFilterValues"></FilterComponent>
				<FilterComponent class="tempo" v-bind:filter-name="'Tempo'"  @updateFilterValues="updateFilterValues"></FilterComponent>
				<FilterComponent class="vocals" v-bind:filter-name="'Vocals'"  @updateFilterValues="updateFilterValues"></FilterComponent>
			</div>
		</div>
</template>

<script>

import FilterComponent from "./FilterComponent";
export default {
  name: 'FiltersComponent',
  components: {
		FilterComponent
	},
	data() {
		return {
      filtersProp: {
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
      }
		}
	},
	methods:{
		updateFilterValues(val){
			switch (val.filterName){
				case "Popularity":
					this.filtersProp.popularity = val;
					break;
				case "Energy":
					this.filtersProp.energy = val;
					break;
        case "Tempo":
					this.filtersProp.tempo = val;
					break;
				case "Vocals":
					this.filtersProp.vocals = val;
					break;
				default:
					break;
			}
      // filters.setPopularity(this.filters.popularity.min, this.filters.popularity.max);
      // filters.setEnergy(this.filters.energy.min, this.filters.energy.max);
      // filters.setTempo(this.filters.tempo.min, this.filters.tempo.max);
      // filters.setVocals(this.filters.vocals.min, this.filters.vocals.max);

      this.$emit('updateFiltersValues', this.filtersProp);
		}
	}
}
</script>

<style scoped>
.filters-header{
	border: 0.2rem solid #3CF836;
	border-right-width: 0;
	display: flex;
}

.title-container{
	height: 100%;
	width: fit-content;
	background-color: #3CF836;
}

.filter-indicator{
	margin-bottom: -3vh;
}

h2{
	padding-left: 1.5vw;
	padding-right: 1.5vw;
	color: black;
}

p{
	color: #3CF836;
	font-size: 1.3rem;
	margin: 0;
}

.filters-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(4,auto);
	gap: 5vh 0px;
	grid-template-areas:
    "low high"
    "popularity popularity"
    "energy energy"
    "tempo tempo"
    "vocals vocals";
	padding-left: 3vw;
	padding-right: 3vw;
	margin-top: 4vh;
	margin-bottom: 5vh;
}
.low {
	grid-area: low;
}

.high {
	grid-area: high;
	text-align: right;
}

.popularity { grid-area: popularity; }
.energy { grid-area: energy; }
.tempo { grid-area: tempo; }
.vocals { grid-area: vocals; }

</style>