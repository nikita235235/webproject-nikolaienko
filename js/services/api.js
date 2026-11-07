import { toBrands, toSneaker } from './transform.js';

const BASE_URL = 'https://dummyjson.com';

async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
}

export async function getCatalog() {
    const data = await request('/products/category/mens-shoes');
    const products = data.products ?? [];
    const brands = toBrands(products);
    return { sneakers: products.map(raw => toSneaker(raw, brands)), brands };
}
