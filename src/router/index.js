import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/Main";
import Photo from "@/views/Photo";
import Favs from "@/views/Favs";

const routes = [
	{
		path: '/',
		name: 'home',
		component: Main
	},
	{
		path: '/photo/:id',
		component: Photo
	},
	{
		path: '/favs',
		component: Favs
	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
