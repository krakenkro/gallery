<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
                <picture class="header__logo" @click="$router.push('/')">
                    <source
                        media="(max-width: 799px)"
                        srcset="@/assets/logo_small.svg"
                    />
                    <source
                        media="(min-width: 800px)"
                        srcset="@/assets/logo.svg"
                    />
                    <img src="@/assets/logo.svg" alt="logo" />
                </picture>
                <div class="header__favs" @click="$router.push('/favs')">
                    <icon-like fill="#fff" />
                    <span>Избранное</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import IconLike from "@/assets/images/IconLike";
export default {
    name: "TheHeader",
    components: {
        IconLike,
    },
};
</script>

<style lang="scss" scoped>
.header {
    background-color: #000;

    &__wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
    }

	&__logo img {
		max-height: 44px;
	}

    &__favs {
        cursor: pointer;
		display: flex;
        svg {
            fill: #fff;
        }
        span {
            display: none;
        }

		@media screen and (min-width: 992px) {
        	span {
				display: block;
				color: #FFF;
				font-size: 18px;
				font-weight: 400;
				margin-left: 10px;
			}
        }
    }
}
</style>
