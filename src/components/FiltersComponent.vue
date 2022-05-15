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
			</div>
		</div>
</template>

<script>

export default {
  name: 'FiltersComponent',
  components: {

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

h2{
	padding-left: 1.5vw;
	padding-right: 1.5vw;
	color: black;
}

p{
	color: #3CF836;
	font-size: 1.3rem;
}

.filters-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(5, 1fr);
	gap: 0px 0px;
	grid-template-areas:
    "low high"
    "filter filter"
    "filter filter"
    "filter filter"
    "filter filter"
    "filter filter";
	padding-left: 3vw;
	padding-right: 3vw;
}
.low {
	grid-area: low;
}

.high {
	grid-area: high;
	text-align: right;
}

.filter {
	grid-area: filter;
}

</style>