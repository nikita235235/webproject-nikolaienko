import { Sneaker } from '../models/Sneaker.js';

export class Store {
    #items = [];
    #brands = new Map();

    constructor(items, brands) {
        this.#items = items.map(Sneaker.fromObject);
        this.#brands = new Map(brands.map(brand => [brand.id, brand.name]));
    }

    all() {
        return [...this.#items];
    }

    search(query) {
        return this.#items.filter(item => item.matches(query));
    }

    byCategory(brandId) {
        return this.#items.filter(item => item.brandId === brandId);
    }

    byId(id) {
        return this.#items.find(item => item.id === id);
    }

    sortedByTitle() {
        return [...this.#items].sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    }

    sortItems(items, mode) {
        const copy = [...items];
        if (mode === 'price-asc') return copy.sort((a, b) => a.price - b.price);
        if (mode === 'price-desc') return copy.sort((a, b) => b.price - a.price);
        return copy.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    }

    countByCategory() {
        return this.#items.reduce((acc, item) => {
            const brand = this.brandName(item.brandId);
            acc[brand] = (acc[brand] || 0) + 1;
            return acc;
        }, {});
    }

    brandName(brandId) {
        return this.#brands.get(brandId) ?? 'Невідомий бренд';
    }
}
