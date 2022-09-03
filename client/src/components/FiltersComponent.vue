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
			popularity:{
				min:0,
				max:100
			},
			energy:{
				min:0,
				max:100
			},
			tempo:{
				min:0,
				max:100
			},
			vocals:{
				min:0,
				max:100
			},
		}
	},
	methods:{
		updateFilterValues(val){
			switch (val.filterName){
				case "Popularity":
					this.popularity = val;
					break;
				case "Energy":
					this.energy = val;
					break;
				case "Tempo":
					this.tempo = val;
					break;
				case "Vocals":
					this.vocals = val;
					break;
				default:
					break;
			}
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