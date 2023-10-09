<template>
  <div class="photo-card">
    <img :src="photo.urls.regular" :alt="photo.alt_description">
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.photo-card {
    cursor: pointer;

    img {
        max-width: 470px;
        max-height: 440px;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        border-radius: 8px;
    }
}
</style>
