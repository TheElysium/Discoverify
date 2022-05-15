<link rel="stylesheet" href="../../../../../../Bureau/Double Range Slider/style.css">
<template>
	<div>
		<div class="track">
			<div class="play">
					<img src="../assets/play.png" alt="">
			</div>
			<div class="title">
					<p class="name">Lorem ipsum sin</p>
					<p class="artist">Dolor amet</p>
			</div>
			<div class="album">
				<p>ouaiisss</p>
			</div>
			<div class="duration">
				<p>4:20</p>
			</div>
			<div class="cover">

			</div>
			</div>
	</div>
</template>

<script>

export default {
  name: 'TrackComponent',
  components: {
  }
}
</script>

<style scoped>
.track{
	border: 0.13rem solid #3CF836;
	height: 8vh;
	margin-top: 1vw;
	margin-left: 1.5vw;
	margin-right: 1.5vw;
	padding-left: 1.5vw;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr;
	gap: 0px 0px;
	grid-template-areas:
    "play title title title title title title title album album album album album album duration . cover";
	align-items:center;
}

.title {
	grid-area: title;
	font-size: 1.2rem;
}

.album {
	grid-area: album;
}

.duration {
	grid-area: duration;
}

.cover {
	grid-area: cover;
}

.play{
	grid-area: play;
	width: 50%;
}

.play img{
	object-fit: scale-down;
}

.track p{
	margin: 0;
}

.name{
	font-family: Sequel;
	font-weight: 600;
}

.artist{
	margin-top: -0.5vh !important;
	font-size: 1rem;
	font-weight: 500;
}
</style>