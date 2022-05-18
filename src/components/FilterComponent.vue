<template>
	<div>
		<p class="filter-name">{{filterName}}</p>
		<div class="slider">
			<div v-bind:id="filterName+'-slider-track'" :style="[filterTrackStyle]"></div>
			<input type="range" min="0" max="100" value="0" v-bind:id="filterName+'-slider-min'" @input="slideMin" @mouseup="sendValues">
			<input type="range" min="0" max="100" value="100" v-bind:id="filterName+'-slider-max'" @input="slideMax" @mouseup="sendValues">
		</div>
	</div>
</template>

<script>
const minGap = 1;

export default {
	name: "FilterComponent",
	props: {
		filterName: String,
	},
	data() {
		return {
			filterTrackStyle: {
				background: "#3CF836",
				width: "100%",
				height: "3px",
				position: "absolute",
				margin: "auto",
				top: "0",
				bottom: "0"
			}
		}
	},
	methods: {
		slideMin(){
			let sliderMin = document.getElementById(this.filterName + "-slider-min");
			let sliderMax = document.getElementById(this.filterName +"-slider-max");

			if(parseInt(sliderMax.value) - parseInt(sliderMin.value) <= minGap){
				sliderMin.value = parseInt(sliderMax.value) - minGap;
			}
			this.fillColor();
		},
		slideMax(){
			let sliderMin = document.getElementById(this.filterName + "-slider-min");
			let sliderMax = document.getElementById(this.filterName +"-slider-max");

			if(parseInt(sliderMax.value) - parseInt(sliderMin.value) <= minGap){
				sliderMax.value = parseInt(sliderMin.value) + minGap;
			}
			this.fillColor();
		},
		fillColor(){
			let sliderMin = document.getElementById(this.filterName + "-slider-min");
			let sliderMax = document.getElementById(this.filterName +"-slider-max");

			let percent1 = (sliderMin.value / 100) * 100;
			let percent2 = (sliderMax.value / 100) * 100;
			this.filterTrackStyle.background = `linear-gradient(to right, white ${percent1}% , #3CF836 ${percent1}% , #3CF836 ${percent2}%, white ${percent2}%)`;
		},
		sendValues(){
			let sliderMin = document.getElementById(this.filterName + "-slider-min");
			let sliderMax = document.getElementById(this.filterName +"-slider-max");

			let filterValues = {
				filterName: this.filterName,
				min: sliderMin.value,
				max: sliderMax.value,
			};

			this.$emit("updateFilterValues", filterValues);
		}
	}
}

</script>

<style scoped>
p{
	font-family: Sequel;
	font-weight: 500;
	font-size: 1.2rem;
	margin: 0 0 2vh;
}

.slider{
	position: relative;
	width: 100%;
	box-sizing: border-box;
}

input[type="range"]{
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 100%;
	outline: none;
	position: absolute;
	margin: auto;
	top: 0;
	bottom: 0;
	background-color: transparent;
	pointer-events: none;
}

input[type="range"]::-webkit-slider-runnable-track{
	-webkit-appearance: none;
	height: 5px;
}
input[type="range"]::-moz-range-track{
	-moz-appearance: none;
	height: 5px;
}
input[type="range"]::-ms-track{
	appearance: none;
	height: 5px;
}
input[type="range"]::-webkit-slider-thumb{
	-webkit-appearance: none;
	height: 1.2em;
	width: 1.2em;
	background-color: #3CF836;
	cursor: pointer;
	margin-top: -9px;
	pointer-events: auto;
	border: none;
	border-radius: 0;
}
input[type="range"]::-moz-range-thumb{
	-webkit-appearance: none;
	height: 1.2em;
	width: 1.2em;
	cursor: pointer;
	background-color: #3CF836;
	pointer-events: auto;
	border: none;
	border-radius: 0;
}
input[type="range"]::-ms-thumb{
	appearance: none;
	height: 1.2em;
	width: 1.2em;
	cursor: pointer;
	background-color: #3CF836;
	pointer-events: auto;
	border: none;
	border-radius: 0;
}
input[type="range"]:active::-webkit-slider-thumb{
	background-color: #3CF836;
}


</style>