import { listBrands, toSneaker } from './transform.js';
import { readCache, writeCache } from './cache.js';

const BASE_URL = 'https://dummyjson.com';
const CATEGORY = 'mens-shoes';

export class HttpError extends Error {
    constructor(status, statusText) {
        super(`HTTP ${status}: ${statusText}`);
        this.name = 'HttpError';
        this.status = status;
    }
}

async function request(path, { signal, force = false } = {}) {
    if (!force) {
        const cached = readCache(path);
        if (cached) return cached;
    }
    const response = await fetch(`${BASE_URL}${path}`, { signal });
    if (!response.ok) throw new HttpError(response.status, response.statusText);
    const data = await response.json();
    writeCache(path, data);
    return data;
}

function toResult(products) {
    return { sneakers: products.map(toSneaker), brands: listBrands() };
}

export async function getCatalog(options) {
    const data = await request(`/products/category/${CATEGORY}`, options);
    return toResult(data.products ?? []);
}

export async function searchSneakers(query, options) {
    const data = await request(`/products/search?q=${encodeURIComponent(query)}`, options);
    const products = (data.products ?? []).filter(raw => raw.category === CATEGORY);
    return toResult(products);
}
