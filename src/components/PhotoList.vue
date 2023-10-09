<template>
    <div class="photo-list">
        <photo-card v-for="photo in photos" :key="photo.id" :photo="photo" @click="$router.push(`/photo/${photo.id}`)" />
    </div>
</template>

<script>
import PhotoCard from "@/components/PhotoCard.vue";

export default {
    components: {
        PhotoCard,
    },
    props: {
        photos: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.photo-list {
    display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 20px;
	
	@media (min-width: 768px) {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>