<template>
  <button class="btn-buy" @click="removeFromCart(item)">Remove</button>
</template>

<script>
export default {
  name: "remove-button",
  props: ["item"],
  methods: {
    removeFromCart() {
      this.$emit("removeFromCart", this.item);
    },
  },
};
</script>

<style>
</style>