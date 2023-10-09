<template>
	<div class="favs">
        <div class="container">
            <h1 class="favs__title">Избранное</h1>
            <div class="favs__photos">
                <div class="favs__photo" v-for="photo in favs" :key="photo.id">
                    <img :src="photo.urls.full" :alt="photo.description">
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			favs: [],
		};
	},
	mounted() {
		this.getFavsPhotos();
	},
	methods: {
		getFavsPhotos() {
            const headers = {
                'Authorization': `Bearer ${process.env.VUE_APP_ACCESS_KEY}`
            }

			axios.get('https://api.unsplash.com/me/likes', {headers})
            .then(response => {
                this.favs = response.data;
            })
            .catch(error => {
                console.log(error)
            });
		},
        getRandomPhotos() {
			const data = {
				params: {
					client_id: process.env.VUE_APP_ACCESS_KEY,
					count: 8
				}
			}
			axios.get('https://api.unsplash.com/photos/random', data)
			.then(response => {
				this.favs = response.data;
			})
			.catch(error => {
				console.error(error);
			});
		}
	},
}
</script>

<style lang="scss" scoped>
.favs {
    &__title {
        color: #000;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
        margin: 40px 0 51px;
    }

    &__photos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;

        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    &__photo {
        text-align: center;
        img {
            width: 100%;
            height: auto; 
            max-height: 453px;
            object-fit: cover;
            border-radius: 8px;
        }
    }
}
</style>