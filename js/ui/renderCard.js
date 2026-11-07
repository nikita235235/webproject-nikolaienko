import { formatPrice } from '../utils/format.js';

export function renderCard({ id, name, price }, brandName) {
    return `
        <article class="card">
            <div class="card__image" role="img" aria-label="${name}"></div>
            <h3 class="card__title">${name}</h3>
            <p class="card__text">${brandName}</p>
            <div class="card__footer">
                <span>${formatPrice(price)}</span>
                <button class="button button--secondary" type="button" data-id="${id}">
                    Детальніше
                </button>
            </div>
        </article>`;
}
