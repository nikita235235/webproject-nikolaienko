import { formatPrice } from '../utils/format.js';

export function renderCard({ id, name, price, imageUrl }, brandName) {
    const image = imageUrl
        ? `<img class="card__image" src="${imageUrl}" alt="${name}" loading="lazy">`
        : `<div class="card__image" role="img" aria-label="${name}"></div>`;
    return `
        <article class="card">
            ${image}
            <h3 class="card__title">${name}</h3>
            <p class="card__text">${brandName}</p>
            <div class="card__footer">
                <span>${formatPrice(price)}</span>
                <button class="button button--secondary" type="button" data-action="open" data-id="${id}">
                    Детальніше
                </button>
            </div>
        </article>`;
}
