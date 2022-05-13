<template>
  <div>
    <div class="tile">
      <img src="../assets/placeholder_img.jpg" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'TileComponent',
  components: {

}
}
</script>

<style>
h1{
  font-family: sequel;
  font-weight: 900;
  font-style: italic;
  text-align: center;
  font-size: 3rem;
  color: #3CF836;
}

img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile{
  width: 100%;
  height: 12vw;
}
</style>