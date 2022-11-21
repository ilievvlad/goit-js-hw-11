import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

import Notiflix from 'notiflix';

import { createGalleryMarkup } from "./js/markup";
import { searchQuery } from "./js/fetch";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')
const btn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', { CaptionDelay: 250, captions: true });

form.addEventListener('submit', searchInformation);
btn.addEventListener('click', onButtonClick);

async function searchInformation(event) {
	event.preventDefault();
	btn.classList.add('visually-hidden');
	searchQuery.page = 1;

	const query = event.target.elements.searchQuery.value.trim();

	const response = await searchQuery.searchPictures(query);
	console.log(response);
	const galleryItem = response.hits;

	try {
		gallery.innerHTML = '';
		if (galleryItem.length === 0) {
			Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");

		} else if (!query) {
			Notiflix.Notify.info('Please, enter key word for search!');

			return;
		} else {
			Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
			renderingMarkup(response.hits);
			btn.classList.remove('visually-hidden');
		}

	} catch (error) {
		console.log(error.message);
	}

}


async function onButtonClick() {
	searchQuery.page += 1;

	const response = await searchQuery.searchPictures();
	if (searchQuery.page > response.totalHits / searchQuery.per_page) {
		btn.classList.add('visually-hidden');
		Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
	}
	renderingMarkup(response.hits);

	const { height: cardHeight } = document
		.querySelector(".gallery")
		.firstElementChild.getBoundingClientRect();

	window.scrollBy({
		top: cardHeight * 2,
		behavior: "smooth",
	});
};

function renderingMarkup(array) {
	gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(array));
	lightbox.refresh();
}