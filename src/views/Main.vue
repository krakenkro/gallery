<template>
	<div class="gallery">
		<div class="gallery__search">
			<div class="container">
				<form class="gallery__form" @submit.prevent="searchImages">
					<input v-model="query" class="gallery__input" type="search" placeholder="Поиск">
				</form>
			</div>
		</div>
		<div class="container">
			<ul class="gallery__photos">
				<li class="gallery__photo" v-for="photo in default_photos" :key="photo.id" @click="$router.push(`/photo/${photo.id}`)">
					<img :src="photo.urls.small" :alt="photo.description">
				</li>
			</ul>
		</div>
		<div v-infinite-scroll="loadMore" />
	</div>
</template>

<script>
import axios from 'axios';
import InfiniteScroll from 'vue-infinite-scroll';
export default {
	directives: {
		InfiniteScroll,
	},
	data() {
		return {
			default_photos: [],
			photo: [],
			query: '',
			page: 1,
			perPage: 8,
			more: true
		};
	},
	mounted() {
		if (!this.query.length) {
			this.getRandomPhotos();
		} 
	},
	methods: {
		async searchImages() {
			this.page = 1;
			await this.searchPhotos();
		},
		async searchPhotos() {
			const data = {
				params: {
					query: this.query,
					client_id: process.env.VUE_APP_ACCESS_KEY,
					page: this.page,
					per_page: this.perPage
				}
			};

			await axios.get('https://api.unsplash.com/search/photos', data)
			.then(response => {
				if (this.page === 1) {
					this.default_photos = response.data.results;
				} else {
					this.images = [...this.default_photos, ...response.data.results];
				}

				this.more = response.data.length  === this.perPage;
			})
			.catch(error => {
				console.error(error);
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
				this.default_photos = response.data;
			})
			.catch(error => {
				console.error(error);
			});
		},
		loadMore() {
			if (this.more) {
				this.page++;
				this.searchPhotos();
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.gallery {
	&__photos {
		list-style: none;
		margin: 0;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;

		@media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
	}

	&__photo {
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

	&__search {
		background-image: url('@/assets/images/van_small.jpg');
  		background-repeat: no-repeat;
		object-fit: cover;
		margin-bottom: 50px;
		background-size: cover;

		@media (min-width: 768px) {
            background-image: url('@/assets/images/van.jpg');
        }
	}

	&__form {
		padding: 80px 0;
		display: flex;
    	justify-content: center;
	}

	&__input {
		max-width: 866px;
		width: 100%;
		border: none;
		height: 70px;
		color: #000;
		font-size: 24px;
		font-weight: 300;
	}

	input.gallery__input {
  		width: 100%;
  		padding: 25px 50px 25px 25px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='23' height='23' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E");
		background-position: 90% 50%;
		background-repeat: no-repeat;
		&:hover, &:active, &:focus {
			border: none;
		}

		@media screen and (min-width: 768px) {
        	background-position: 97% 50%;
        }
	}
}
</style>
