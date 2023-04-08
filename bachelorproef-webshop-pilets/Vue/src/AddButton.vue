<template>
  <button class="btn-buy" @click="addToCart(params)">Buy {{item}} here 1</button>
</template>

<script>
export default {
  name: "add-button",
  props: ["addToCart", "params"],
}
</script>

<style>
</style>