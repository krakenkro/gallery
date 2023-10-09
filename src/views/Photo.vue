<template>
	<div class="photo">
		<div class="container">
			<div class="photo__info" v-if="photo">
                <div class="photo__author">
                    <picture>
                        <source media="(max-width: 799px)" :srcset="photo.user.profile_image.medium" />
                        <source media="(min-width: 800px)" :srcset="photo.user.profile_image.large" />
                        <img :src="photo.urls.small" :alt="photo.description" />
                    </picture>
                    <div>
                        <span class="photo__author_name">{{ photo.user.name }}</span>
                        <span class="photo__author_username">@{{ photo.user.username }}</span>
                    </div>
                </div>
                <div class="photo__actions">
                    <button class="photo__actions_like" @click="addToFavorites(photo.id)">
                        <img src="@/assets/images/Like.svg" alt="like">
                    </button>
                    <button class="photo__actions_download">
                        <img src="@/assets/images/Download.svg" alt="download">
                    </button>
                </div>
            </div>
            <div class="photo__img" v-if="photo">
                <img :src="photo.urls.full" :alt="photo.description" />
            </div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			photo: null
		};
	},
	mounted() {
        this.getPhotoById();
    },
    methods: {
        addToFavorites(id) {
            axios.post(`https://api.unsplash.com/photos/${id}/like`, null, { headers: { Authorization: `Bearer ${process.env.VUE_APP_ACCESS_KEY}` } })
            .then(response => {
                console.log('Photo added to favorites:', response.data);
            })
            .catch(error => {
                console.error('Error adding photo to favorites:', error);
            });
        },
        getPhotoById() {
            axios.get(`https://api.unsplash.com/photos/${this.$route.params.id}`, { headers: { Authorization: `Client-ID ${process.env.VUE_APP_ACCESS_KEY}` } })
            .then(response => {
                this.photo = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.photo {
    &__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 40px 0 32px;
    }

	&__author {
        display: flex;
        align-items: center;

		img {
			max-width: 48px;
            height: 48px;
			width: 100%;
			object-fit: cover; 
			border-radius: 8px;
            border: 1px solid #FFF;
            margin-right: 4px;
		}

        span {
            display: block;
        }
	}

    &__author_name {
        color: #000;
        font-size: 18px;
        font-weight: 400;
    }

    &__author_username {
        color: #BDBDBD;
        font-size: 14px;
        font-weight: 400;
    }

    &__actions {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        &_like,
        &_download {
            cursor: pointer;
            border: none;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            line-height: 0;
        }

        &_like {
            background-color: #fff;
        }

        &_download {
            background-color: #FFF200;

            span {
                display: none;
            }
        }
    }

    &__img {
        img {
            max-width: 1470px;
            width: 100%;
            object-fit: cover;
        }
    }

    @media screen and (min-width: 1500px) {
        background-image: url('@/assets/images/photo_background.jpg');
        background-repeat: no-repeat;
        object-fit: cover;

        &__actions_download span {
            display: inline-block;
        }

        &__author_name,
        &__author_username {
            color: #fff;
        }
    }
}
</style>
