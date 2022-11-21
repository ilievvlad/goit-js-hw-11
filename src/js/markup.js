export function createGalleryMarkup(array) {
	return array.reduce((acc, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => acc + `
	<a href="${largeImageURL}" class="gallery__item">
		<div>
 			<img src="${webformatURL}" class="gallery__img" alt="${tags}" loading="lazy" />
 			<div class="gallery__info">
				<p>
					Likes <span>${likes}</span>
				</p>
				<p>
					Views <span>${views}</span>
				</p>
				<p>
					Comments <span>${comments}</span>
				</p>
				<p>
					Downloads <span>${downloads}</span>
				</p>
 			</div>
		</div>
	</a>`, " ");
}
